import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { BASE_ID, SEED_POSTS } from './seed'
import type {
  CreatePostInput,
  ListPostsParams,
  ListPostsResult,
  Post,
  PostRepository,
  UpdatePostInput,
} from './types'

type SqlClient = NeonQueryFunction<false, false>
type Row = Record<string, unknown>

let cachedSql: SqlClient | null = null

function getSql(): SqlClient {
  if (cachedSql) return cachedSql
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL 환경 변수가 설정되어 있지 않습니다.')
  }
  cachedSql = neon(url)
  return cachedSql
}

// ---------------------------------------------------------------------------
// Lazy provisioning: CREATE TABLE IF NOT EXISTS + seed, once per instance.
// ---------------------------------------------------------------------------

let readyPromise: Promise<void> | null = null

function ensureReady(): Promise<void> {
  if (!readyPromise) {
    readyPromise = provision().catch((error: unknown) => {
      // 실패 시 캐시를 비워 다음 요청에서 재시도할 수 있게 한다.
      readyPromise = null
      throw error
    })
  }
  return readyPromise
}

async function provision(): Promise<void> {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS board_posts (
      id bigint PRIMARY KEY,
      title text NOT NULL,
      author text NOT NULL,
      content text NOT NULL,
      views integer NOT NULL DEFAULT 0,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `
  const countRows = await sql`SELECT COUNT(*)::int AS total FROM board_posts`
  if (readInt(countRows[0], 'total') > 0) return

  for (const post of SEED_POSTS) {
    await sql`
      INSERT INTO board_posts (id, title, author, content, views, created_at, updated_at)
      VALUES (${post.id}, ${post.title}, ${post.author}, ${post.content},
              ${post.views}, ${post.createdAt}, ${post.updatedAt})
      ON CONFLICT (id) DO NOTHING
    `
  }
}

// ---------------------------------------------------------------------------
// Row → Post mapping (snake_case → camelCase, 값 검증 포함)
// ---------------------------------------------------------------------------

function readInt(row: Row | undefined, column: string): number {
  const value = row?.[column]
  // bigint(int8)는 드라이버가 문자열로 반환할 수 있다.
  const parsed = typeof value === 'string' ? Number(value) : value
  if (typeof parsed !== 'number' || !Number.isFinite(parsed)) {
    throw new Error(`board_posts.${column} 값이 숫자가 아닙니다.`)
  }
  return parsed
}

function readText(row: Row, column: string): string {
  const value = row[column]
  if (typeof value !== 'string') {
    throw new Error(`board_posts.${column} 값이 문자열이 아닙니다.`)
  }
  return value
}

function readIsoDate(row: Row, column: string): string {
  const value = row[column]
  const date =
    value instanceof Date ? value : typeof value === 'string' ? new Date(value) : null
  if (!date || Number.isNaN(date.getTime())) {
    throw new Error(`board_posts.${column} 값이 유효한 날짜가 아닙니다.`)
  }
  return date.toISOString()
}

function mapRow(row: Row): Post {
  return {
    id: readInt(row, 'id'),
    title: readText(row, 'title'),
    author: readText(row, 'author'),
    content: readText(row, 'content'),
    views: readInt(row, 'views'),
    createdAt: readIsoDate(row, 'created_at'),
    updatedAt: readIsoDate(row, 'updated_at'),
  }
}

/** ILIKE 와일드카드(%, _)와 이스케이프 문자를 리터럴로 취급하도록 이스케이프한다. */
function toLikePattern(keyword: string): string {
  const escaped = keyword.replace(/[\\%_]/g, (char) => `\\${char}`)
  return `%${escaped}%`
}

// ---------------------------------------------------------------------------
// PostRepository 구현
// ---------------------------------------------------------------------------

async function list({ page, pageSize, q }: ListPostsParams): Promise<ListPostsResult> {
  await ensureReady()
  const sql = getSql()
  const offset = (page - 1) * pageSize
  const keyword = q?.trim()

  let rows: Row[]
  let countRows: Row[]
  if (keyword) {
    const pattern = toLikePattern(keyword)
    rows = await sql`
      SELECT id, title, author, content, views, created_at, updated_at
      FROM board_posts
      WHERE title ILIKE ${pattern}
      ORDER BY id DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `
    countRows = await sql`
      SELECT COUNT(*)::int AS total FROM board_posts WHERE title ILIKE ${pattern}
    `
  } else {
    rows = await sql`
      SELECT id, title, author, content, views, created_at, updated_at
      FROM board_posts
      ORDER BY id DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `
    countRows = await sql`SELECT COUNT(*)::int AS total FROM board_posts`
  }

  return {
    items: rows.map(mapRow),
    total: readInt(countRows[0], 'total'),
    page,
    pageSize,
  }
}

async function getById(id: number): Promise<Post | null> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`
    SELECT id, title, author, content, views, created_at, updated_at
    FROM board_posts
    WHERE id = ${id}
  `
  const row = rows[0]
  return row ? mapRow(row) : null
}

async function create(data: CreatePostInput): Promise<Post> {
  await ensureReady()
  const sql = getSql()
  // 빈 테이블에서도 집계(MAX)는 한 행을 반환하므로 항상 정확히 한 건이 삽입된다.
  const rows = await sql`
    INSERT INTO board_posts (id, title, author, content, views, created_at, updated_at)
    SELECT COALESCE(MAX(id) + 1, ${BASE_ID}), ${data.title}, ${data.author}, ${data.content},
           0, now(), now()
    FROM board_posts
    RETURNING id, title, author, content, views, created_at, updated_at
  `
  const row = rows[0]
  if (!row) {
    throw new Error('게시글 등록에 실패했습니다.')
  }
  return mapRow(row)
}

async function update(id: number, data: UpdatePostInput): Promise<Post | null> {
  await ensureReady()
  const sql = getSql()
  // undefined(변경 없음) 필드는 NULL 파라미터 + COALESCE로 기존 값을 유지한다.
  const rows = await sql`
    UPDATE board_posts SET
      title = COALESCE(${data.title ?? null}, title),
      author = COALESCE(${data.author ?? null}, author),
      content = COALESCE(${data.content ?? null}, content),
      updated_at = now()
    WHERE id = ${id}
    RETURNING id, title, author, content, views, created_at, updated_at
  `
  const row = rows[0]
  return row ? mapRow(row) : null
}

async function remove(id: number): Promise<boolean> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`DELETE FROM board_posts WHERE id = ${id} RETURNING id`
  return rows.length > 0
}

async function incrementViews(id: number): Promise<Post | null> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`
    UPDATE board_posts SET views = views + 1
    WHERE id = ${id}
    RETURNING id, title, author, content, views, created_at, updated_at
  `
  const row = rows[0]
  return row ? mapRow(row) : null
}

/** Neon Postgres(HTTP 드라이버) 기반 저장소 — Vercel 서버리스 배포용. */
export const postgresPostRepository: PostRepository = {
  list,
  getById,
  create,
  update,
  remove,
  incrementViews,
}

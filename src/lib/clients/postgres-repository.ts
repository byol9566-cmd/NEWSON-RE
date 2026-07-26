import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { SEED_CLIENTS } from './seed'
import type { ClientListRepository } from './types'

type SqlClient = NeonQueryFunction<false, false>

const LIST_ROW_ID = 1

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
      readyPromise = null
      throw error
    })
  }
  return readyPromise
}

async function provision(): Promise<void> {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS client_list (
      id integer PRIMARY KEY,
      names jsonb NOT NULL DEFAULT '[]'::jsonb
    )
  `
  await sql`
    INSERT INTO client_list (id, names)
    VALUES (${LIST_ROW_ID}, ${JSON.stringify(SEED_CLIENTS)}::jsonb)
    ON CONFLICT (id) DO NOTHING
  `
}

function readNames(value: unknown): string[] {
  const parsed = typeof value === 'string' ? JSON.parse(value) : value
  if (!Array.isArray(parsed)) {
    throw new Error('client_list.names 값이 배열이 아닙니다.')
  }
  return parsed.map((item) => String(item))
}

// ---------------------------------------------------------------------------
// ClientListRepository 구현
// ---------------------------------------------------------------------------

async function list(): Promise<string[]> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`SELECT names FROM client_list WHERE id = ${LIST_ROW_ID}`
  const row = rows[0]
  return row ? readNames(row.names) : []
}

async function replace(names: string[]): Promise<string[]> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`
    UPDATE client_list SET names = ${JSON.stringify(names)}::jsonb
    WHERE id = ${LIST_ROW_ID}
    RETURNING names
  `
  const row = rows[0]
  if (!row) {
    throw new Error('고객사 리스트 행을 찾을 수 없습니다.')
  }
  return readNames(row.names)
}

/** Neon Postgres(HTTP 드라이버) 기반 저장소 — Vercel 서버리스 배포용. */
export const postgresClientListRepository: ClientListRepository = {
  list,
  replace,
}

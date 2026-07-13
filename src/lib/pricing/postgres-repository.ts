import { neon, type NeonQueryFunction } from '@neondatabase/serverless'
import { SEED_TIERS } from './seed'
import type { PricingTierRecord, PricingTierRepository, UpdateTierInput } from './types'

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
      readyPromise = null
      throw error
    })
  }
  return readyPromise
}

async function provision(): Promise<void> {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS pricing_tiers (
      id integer PRIMARY KEY,
      name text NOT NULL,
      price text NOT NULL,
      summary text NOT NULL,
      media jsonb NOT NULL DEFAULT '[]'::jsonb
    )
  `
  const countRows = await sql`SELECT COUNT(*)::int AS total FROM pricing_tiers`
  if (readInt(countRows[0], 'total') > 0) return

  for (const tier of SEED_TIERS) {
    await sql`
      INSERT INTO pricing_tiers (id, name, price, summary, media)
      VALUES (${tier.id}, ${tier.name}, ${tier.price}, ${tier.summary}, ${JSON.stringify(tier.media)}::jsonb)
      ON CONFLICT (id) DO NOTHING
    `
  }
}

// ---------------------------------------------------------------------------
// Row → PricingTierRecord mapping
// ---------------------------------------------------------------------------

function readInt(row: Row | undefined, column: string): number {
  const value = row?.[column]
  const parsed = typeof value === 'string' ? Number(value) : value
  if (typeof parsed !== 'number' || !Number.isFinite(parsed)) {
    throw new Error(`pricing_tiers.${column} 값이 숫자가 아닙니다.`)
  }
  return parsed
}

function readText(row: Row, column: string): string {
  const value = row[column]
  if (typeof value !== 'string') {
    throw new Error(`pricing_tiers.${column} 값이 문자열이 아닙니다.`)
  }
  return value
}

function readMedia(row: Row): string[] {
  const value = row.media
  const parsed = typeof value === 'string' ? JSON.parse(value) : value
  if (!Array.isArray(parsed)) {
    throw new Error('pricing_tiers.media 값이 배열이 아닙니다.')
  }
  return parsed.map((item) => String(item))
}

function mapRow(row: Row): PricingTierRecord {
  return {
    id: readInt(row, 'id'),
    name: readText(row, 'name'),
    price: readText(row, 'price'),
    summary: readText(row, 'summary'),
    media: readMedia(row),
  }
}

// ---------------------------------------------------------------------------
// PricingTierRepository 구현
// ---------------------------------------------------------------------------

async function list(): Promise<PricingTierRecord[]> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`
    SELECT id, name, price, summary, media FROM pricing_tiers ORDER BY id ASC
  `
  return rows.map(mapRow)
}

async function getById(id: number): Promise<PricingTierRecord | null> {
  await ensureReady()
  const sql = getSql()
  const rows = await sql`
    SELECT id, name, price, summary, media FROM pricing_tiers WHERE id = ${id}
  `
  const row = rows[0]
  return row ? mapRow(row) : null
}

async function update(id: number, data: UpdateTierInput): Promise<PricingTierRecord | null> {
  await ensureReady()
  const sql = getSql()
  const mediaJson = data.media ? JSON.stringify(data.media) : null
  const rows = await sql`
    UPDATE pricing_tiers SET
      name = COALESCE(${data.name ?? null}, name),
      price = COALESCE(${data.price ?? null}, price),
      summary = COALESCE(${data.summary ?? null}, summary),
      media = COALESCE(${mediaJson}::jsonb, media)
    WHERE id = ${id}
    RETURNING id, name, price, summary, media
  `
  const row = rows[0]
  return row ? mapRow(row) : null
}

/** Neon Postgres(HTTP 드라이버) 기반 저장소 — Vercel 서버리스 배포용. */
export const postgresPricingRepository: PricingTierRepository = {
  list,
  getById,
  update,
}

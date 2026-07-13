import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { SEED_TIERS } from './seed'
import type { PricingTierRecord, PricingTierRepository, UpdateTierInput } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'pricing.json')

function ensureStore(): void {
  if (existsSync(DATA_FILE)) return
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(SEED_TIERS, null, 2), 'utf-8')
}

function readTiers(): PricingTierRecord[] {
  ensureStore()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('pricing.json 형식이 올바르지 않습니다.')
    }
    return parsed as PricingTierRecord[]
  } catch (error) {
    console.error('Failed to parse pricing data file', error)
    throw new Error('가격 등급 데이터를 읽을 수 없습니다. data/pricing.json 파일을 확인해 주세요.')
  }
}

function writeTiers(tiers: readonly PricingTierRecord[]): void {
  ensureStore()
  writeFileSync(DATA_FILE, JSON.stringify(tiers, null, 2), 'utf-8')
}

async function list(): Promise<PricingTierRecord[]> {
  return readTiers().sort((a, b) => a.id - b.id)
}

async function getById(id: number): Promise<PricingTierRecord | null> {
  return readTiers().find((tier) => tier.id === id) ?? null
}

async function update(id: number, data: UpdateTierInput): Promise<PricingTierRecord | null> {
  const tiers = readTiers()
  const target = tiers.find((tier) => tier.id === id)
  if (!target) return null

  const updated: PricingTierRecord = { ...target, ...data }
  writeTiers(tiers.map((tier) => (tier.id === id ? updated : tier)))
  return updated
}

/** 로컬 개발용 JSON 파일 저장소 (Vercel 등 읽기 전용 파일시스템에서는 사용 불가). */
export const jsonPricingRepository: PricingTierRepository = {
  list,
  getById,
  update,
}

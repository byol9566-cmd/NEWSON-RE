import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { SEED_CLIENTS } from './seed'
import type { ClientListRepository } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'clients.json')

function ensureStore(): void {
  if (existsSync(DATA_FILE)) return
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(SEED_CLIENTS, null, 2), 'utf-8')
}

function readClients(): string[] {
  ensureStore()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('clients.json 형식이 올바르지 않습니다.')
    }
    return parsed.map((item) => String(item))
  } catch (error) {
    console.error('Failed to parse clients data file', error)
    throw new Error('고객사 데이터를 읽을 수 없습니다. data/clients.json 파일을 확인해 주세요.')
  }
}

async function list(): Promise<string[]> {
  return readClients()
}

async function replace(names: string[]): Promise<string[]> {
  ensureStore()
  writeFileSync(DATA_FILE, JSON.stringify(names, null, 2), 'utf-8')
  return [...names]
}

/** 로컬 개발용 JSON 파일 저장소 (Vercel 등 읽기 전용 파일시스템에서는 사용 불가). */
export const jsonClientListRepository: ClientListRepository = {
  list,
  replace,
}

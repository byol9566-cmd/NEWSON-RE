import { jsonClientListRepository } from './json-repository'
import { postgresClientListRepository } from './postgres-repository'
import type { ClientListRepository } from './types'

/**
 * 저장소 팩토리.
 * - DATABASE_URL이 설정된 환경(Vercel + Neon) → Postgres 저장소
 * - 미설정(로컬 개발/빌드) → JSON 파일 저장소(data/clients.json)
 */
export const clientListRepository: ClientListRepository = process.env.DATABASE_URL
  ? postgresClientListRepository
  : jsonClientListRepository

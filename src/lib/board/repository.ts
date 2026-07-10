import { jsonPostRepository } from './json-repository'
import { postgresPostRepository } from './postgres-repository'
import type { PostRepository } from './types'

/**
 * 저장소 팩토리.
 * - DATABASE_URL이 설정된 환경(Vercel + Neon) → Postgres 저장소
 * - 미설정(로컬 개발/빌드) → JSON 파일 저장소(data/board.json)
 */
export const postRepository: PostRepository = process.env.DATABASE_URL
  ? postgresPostRepository
  : jsonPostRepository

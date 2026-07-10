import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'admin_session'

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12 // 12시간
const TOKEN_PREFIX = 'admin.'

// 로컬 개발용 폴백 — 운영 배포 전 반드시 환경변수로 교체할 것
const DEV_FALLBACK_PASSWORD = 'newson2026'
const DEV_FALLBACK_SECRET = 'newson-board-local-dev-secret'

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? DEV_FALLBACK_SECRET
}

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? DEV_FALLBACK_PASSWORD
}

function sign(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

export function createSessionToken(): string {
  const payload = `${TOKEN_PREFIX}${Date.now()}`
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string): boolean {
  const lastDot = token.lastIndexOf('.')
  if (lastDot <= 0) return false

  const payload = token.slice(0, lastDot)
  const signature = token.slice(lastDot + 1)
  if (!payload.startsWith(TOKEN_PREFIX)) return false

  const issuedAt = Number(payload.slice(TOKEN_PREFIX.length))
  if (!Number.isFinite(issuedAt)) return false
  if (Date.now() - issuedAt > SESSION_MAX_AGE_SECONDS * 1000) return false

  return safeEqual(signature, sign(payload))
}

export function isValidAdminPassword(password: string): boolean {
  // 해시 후 비교해 길이 차이로 인한 타이밍 누출을 방지
  const inputDigest = createHash('sha256').update(password).digest()
  const expectedDigest = createHash('sha256').update(getAdminPassword()).digest()
  return timingSafeEqual(inputDigest, expectedDigest)
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return false
  return verifySessionToken(token)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE_SECONDS,
} as const

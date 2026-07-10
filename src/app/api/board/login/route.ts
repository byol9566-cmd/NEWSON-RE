import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  isValidAdminPassword,
  sessionCookieOptions,
} from '@/lib/board/auth'
import { loginSchema } from '@/lib/board/validation'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.'
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 })
  }

  if (!isValidAdminPassword(parsed.data.password)) {
    return NextResponse.json(
      { ok: false, error: '비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    )
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(), sessionCookieOptions)
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/board/auth'
import { clientListRepository } from '@/lib/clients/repository'
import { clientListUpdateSchema } from '@/lib/clients/validation'

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: '로그인이 필요합니다.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const parsed = clientListUpdateSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.'
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 })
  }

  try {
    const clients = await clientListRepository.replace(parsed.data.clients)
    return NextResponse.json({ ok: true, clients })
  } catch (error) {
    console.error('Failed to update client list', error)
    return NextResponse.json(
      { ok: false, error: '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }
}

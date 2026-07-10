import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/board/auth'
import { postRepository } from '@/lib/board/repository'
import { postInputSchema } from '@/lib/board/validation'

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: '로그인이 필요합니다.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const parsed = postInputSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.'
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 })
  }

  try {
    const post = await postRepository.create(parsed.data)
    return NextResponse.json({ ok: true, post }, { status: 201 })
  } catch (error) {
    console.error('Failed to create board post', error)
    return NextResponse.json(
      { ok: false, error: '게시물 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }
}

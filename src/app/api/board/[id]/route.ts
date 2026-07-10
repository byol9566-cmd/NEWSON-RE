import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/board/auth'
import { postRepository } from '@/lib/board/repository'
import { parsePostId, postInputSchema } from '@/lib/board/validation'

type RouteContext = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const { id } = await params
  const postId = parsePostId(id)
  if (postId === null) {
    return NextResponse.json({ ok: false, error: '잘못된 게시물 번호입니다.' }, { status: 400 })
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
    const updated = await postRepository.update(postId, parsed.data)
    if (!updated) {
      return NextResponse.json({ ok: false, error: '게시물을 찾을 수 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, post: updated })
  } catch (error) {
    console.error('Failed to update board post', error)
    return NextResponse.json(
      { ok: false, error: '게시물 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const { id } = await params
  const postId = parsePostId(id)
  if (postId === null) {
    return NextResponse.json({ ok: false, error: '잘못된 게시물 번호입니다.' }, { status: 400 })
  }

  try {
    const removed = await postRepository.remove(postId)
    if (!removed) {
      return NextResponse.json({ ok: false, error: '게시물을 찾을 수 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to delete board post', error)
    return NextResponse.json(
      { ok: false, error: '게시물 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }
}

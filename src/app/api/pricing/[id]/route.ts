import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/board/auth'
import { pricingRepository } from '@/lib/pricing/repository'
import { parseTierId, tierUpdateSchema } from '@/lib/pricing/validation'

type RouteContext = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const { id } = await params
  const tierId = parseTierId(id)
  if (tierId === null) {
    return NextResponse.json({ ok: false, error: '잘못된 등급 번호입니다.' }, { status: 400 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const parsed = tierUpdateSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.'
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 })
  }

  try {
    const updated = await pricingRepository.update(tierId, parsed.data)
    if (!updated) {
      return NextResponse.json({ ok: false, error: '등급을 찾을 수 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, tier: updated })
  } catch (error) {
    console.error('Failed to update pricing tier', error)
    return NextResponse.json(
      { ok: false, error: '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }
}

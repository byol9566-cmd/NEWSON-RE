import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { getClientIp, isRateLimited, isValidKoreanPhone } from '@/lib/inquiry/spam-guard'

const SERVICE_LABELS: Record<string, string> = {
  basic: '보도자료 배포 (55,000원~)',
  minor: '마이너 (110,000원~)',
  mid: '중급 (165,000원~)',
  premium: '프리미엄 (275,000원~)',
  major: '메이저 (440,000원~)',
  top: 'TOP 메이저 (660,000원~)',
  custom: '맞춤 견적',
  crisis: '위기관리·정정 대응',
  other: '기타 문의',
}

const MIN_FILL_TIME_MS = 3000

const inquirySchema = z.object({
  name: z.string().trim().min(1, '성함을 입력해 주세요.').max(50),
  company: z.string().trim().min(1, '회사명을 입력해 주세요.').max(100),
  tel: z
    .string()
    .trim()
    .min(1, '연락처를 입력해 주세요.')
    .max(20)
    .refine(isValidKoreanPhone, '연락 가능한 전화번호를 입력해 주세요. (예: 010-0000-0000)'),
  email: z.union([z.string().trim().email(), z.literal('')]).optional(),
  service: z.string().trim().min(1, '문의 서비스를 선택해 주세요.').max(50),
  message: z.string().trim().min(1, '상세 내용을 입력해 주세요.').max(2000),
  // 스팸 봇 감지용: hpField는 사람 눈에 보이지 않는 허니팟, elapsedMs는 폼 작성 소요 시간
  hpField: z.string().max(200).optional(),
  elapsedMs: z.number().optional(),
})

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (ip !== null && isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: '요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const parsed = inquirySchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.'
    return NextResponse.json({ ok: false, error: firstIssue }, { status: 400 })
  }

  // 허니팟이 채워졌으면 봇: 이메일을 보내지 않고 성공한 척 응답해 봇이 학습하지 못하게 한다
  if (parsed.data.hpField?.trim()) {
    console.warn('Inquiry honeypot triggered', { ip })
    return NextResponse.json({ ok: true })
  }

  // 실제 폼은 elapsedMs를 항상 보내므로, 없거나 비정상적으로 빠르면 봇의 직접 POST로 간주
  if (typeof parsed.data.elapsedMs !== 'number' || parsed.data.elapsedMs < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { ok: false, error: '접수 확인에 실패했습니다. 잠시 후 다시 제출해 주세요.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json(
      { ok: false, error: '서버 설정 오류로 접수에 실패했습니다. 전화(1544-4701)로 문의해 주세요.' },
      { status: 500 }
    )
  }

  const { name, company, tel, email, service, message } = parsed.data
  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from: process.env.INQUIRY_FROM_EMAIL || '뉴스온 홈페이지 <noreply@newson.co.kr>',
      to: process.env.INQUIRY_TO_EMAIL || 'newsmarketing@daum.net',
      replyTo: email || undefined,
      subject: `[뉴스온 온라인 문의] ${company} - ${name}`,
      text: [
        `담당자: ${name}`,
        `회사명: ${company}`,
        `연락처: ${tel}`,
        `이메일: ${email || '(미입력)'}`,
        `문의 서비스: ${SERVICE_LABELS[service] ?? service}`,
        '',
        '상세 내용:',
        message,
      ].join('\n'),
    })

    if (error) {
      console.error('Resend API error', error)
      return NextResponse.json(
        { ok: false, error: '이메일 전송에 실패했습니다. 전화(1544-4701)로 문의해 주세요.' },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('Failed to send inquiry email', error)
    return NextResponse.json(
      { ok: false, error: '이메일 전송에 실패했습니다. 전화(1544-4701)로 문의해 주세요.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}

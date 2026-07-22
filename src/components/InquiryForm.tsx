'use client'

import { FormEvent, useRef, useState } from 'react'
import Link from 'next/link'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface InquiryFormProps {
  defaultName?: string
  defaultTel?: string
  defaultMessage?: string
}

export default function InquiryForm({ defaultName, defaultTel, defaultMessage }: InquiryFormProps) {
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const mountedAtRef = useRef(Date.now())

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setState('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          company: formData.get('company'),
          tel: formData.get('tel'),
          email: formData.get('email'),
          service: formData.get('service'),
          message: formData.get('message'),
          hpField: formData.get('hpField') || '',
          elapsedMs: Date.now() - mountedAtRef.current,
        }),
      })
      const data = await res.json()

      if (!res.ok || !data.ok) {
        setState('error')
        setErrorMessage(data.error || '문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      setState('success')
      form.reset()
    } catch {
      setState('error')
      setErrorMessage('네트워크 오류로 문의 접수에 실패했습니다. 전화(1544-4701)로 문의해 주세요.')
    }
  }

  if (state === 'success') {
    return (
      <div className="inquiry-success" role="status">
        <strong>문의가 접수되었습니다.</strong>
        <p>전담 AE가 2시간 내에 연락 드리겠습니다.</p>
      </div>
    )
  }

  return (
    <form className="inquiry-form" id="inquiry-form" onSubmit={handleSubmit}>
      {/* 허니팟: 사람에게는 보이지 않는 필드. 봇이 값을 채우면 서버에서 스팸으로 판별 */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor="if-hp-field">이 칸은 비워 두세요</label>
        <input type="text" id="if-hp-field" name="hpField" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="if-row">
        <div>
          <label htmlFor="if-name">담당자 성함 <span className="required">*</span></label>
          <input type="text" id="if-name" name="name" required placeholder="홍길동" defaultValue={defaultName} />
        </div>
        <div>
          <label htmlFor="if-company">회사명 <span className="required">*</span></label>
          <input type="text" id="if-company" name="company" required placeholder="(주)브랜드" />
        </div>
      </div>
      <div className="if-row">
        <div>
          <label htmlFor="if-tel">연락처 <span className="required">*</span></label>
          <input type="tel" id="if-tel" name="tel" required placeholder="010-0000-0000" defaultValue={defaultTel} />
        </div>
        <div>
          <label htmlFor="if-email">이메일</label>
          <input type="email" id="if-email" name="email" placeholder="contact@company.com" />
        </div>
      </div>
      <div>
        <label htmlFor="if-service">문의 서비스 <span className="required">*</span></label>
        <select id="if-service" name="service" required>
          <option value="">선택하세요</option>
          <option value="basic">보도자료 배포 (55,000원~)</option>
          <option value="minor">마이너 (110,000원~)</option>
          <option value="mid">중급 (165,000원~)</option>
          <option value="premium">프리미엄 (275,000원~)</option>
          <option value="major">메이저 (440,000원~)</option>
          <option value="top">TOP 메이저 (660,000원~)</option>
          <option value="custom">맞춤 견적</option>
          <option value="crisis">위기관리·정정 대응</option>
          <option value="other">기타 문의</option>
        </select>
      </div>
      <div>
        <label htmlFor="if-message">상세 내용 <span className="required">*</span></label>
        <textarea id="if-message" name="message" required placeholder="브랜드 소개, 홍보 목적, 원하는 일정 등을 간단히 작성해 주세요" defaultValue={defaultMessage} />
      </div>
      <div className="if-agree">
        <input type="checkbox" id="if-privacy" required />
        <label htmlFor="if-privacy">
          <Link href="/privacy" target="_blank" rel="noopener noreferrer">개인정보 수집 · 이용</Link>에 동의합니다 <span className="required">*</span>
        </label>
      </div>
      {state === 'error' && (
        <p className="if-submit-error" role="alert">{errorMessage}</p>
      )}
      <button type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? '접수 중...' : '무료 견적 신청 →'}
      </button>
    </form>
  )
}

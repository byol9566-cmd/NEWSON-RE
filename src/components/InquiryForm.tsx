'use client'

import { FormEvent } from 'react'

export default function InquiryForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert('문의가 접수되었습니다. 전담 AE가 2시간 내에 연락 드리겠습니다.')
    e.currentTarget.reset()
  }

  return (
    <form className="inquiry-form" id="inquiry-form" onSubmit={handleSubmit}>
      <div className="if-row">
        <div>
          <label htmlFor="if-name">담당자 성함 <span className="required">*</span></label>
          <input type="text" id="if-name" name="name" required placeholder="홍길동" />
        </div>
        <div>
          <label htmlFor="if-company">회사명 <span className="required">*</span></label>
          <input type="text" id="if-company" name="company" required placeholder="(주)브랜드" />
        </div>
      </div>
      <div className="if-row">
        <div>
          <label htmlFor="if-tel">연락처 <span className="required">*</span></label>
          <input type="tel" id="if-tel" name="tel" required placeholder="010-0000-0000" />
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
          <option value="basic">BASIC — 스타트업 패키지 (80만원~)</option>
          <option value="standard">STANDARD — 중견기업 패키지 (180만원~)</option>
          <option value="premium">PREMIUM — 대기업 패키지 (350만원~)</option>
          <option value="custom">맞춤 견적</option>
          <option value="crisis">위기관리·정정 대응</option>
          <option value="other">기타 문의</option>
        </select>
      </div>
      <div>
        <label htmlFor="if-message">상세 내용 <span className="required">*</span></label>
        <textarea id="if-message" name="message" required placeholder="브랜드 소개, 홍보 목적, 원하는 일정 등을 간단히 작성해 주세요" />
      </div>
      <div className="if-agree">
        <input type="checkbox" id="if-privacy" required />
        <label htmlFor="if-privacy">개인정보 수집 · 이용에 동의합니다 <span className="required">*</span></label>
      </div>
      <button type="submit">무료 견적 신청 →</button>
    </form>
  )
}

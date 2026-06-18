import { Metadata } from 'next'
import SubPageLayout from '@/components/SubPageLayout'
import InquiryForm from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: '온라인 문의 — 뉴스온',
  description: '뉴스온 언론홍보 서비스 무료 견적 · 온라인 문의. 평균 2시간 내 답변.',
}

export default function InquiryPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CONTACT"
        title="온라인 문의"
        sub="평균 2시간 이내에 전담 AE가 답변 드립니다. 필요한 정보만 간단히 남겨주세요."
        breadcrumb="INQUIRY"
        sidebarHeading="문의하기"
        sidebarItems={[
          { label: '견적 신청', href: '/inquiry', active: true },
          { label: '자주 묻는 질문', href: '/customer' },
        ]}
        consultHeading="빠른 상담"
        consultBtnLabel="이메일로 문의"
        consultBtnHref="mailto:newsmarketing@daum.net"
      >
        <h2 className="content-h2">무료 견적 신청</h2>
        <p className="content-lead">간단한 정보만 남겨주시면 전담 AE가 브랜드 상황에 맞춘 맞춤 견적을 전달드립니다. 모든 정보는 상담 목적으로만 사용되며 엄격히 관리됩니다.</p>

        <InquiryForm />

        <div className="cta-box">
          <div>
            <strong>전화 상담을 원하시나요?</strong>
            <p>평일 09:00 ~ 18:00 · 전담 AE가 바로 응대합니다</p>
          </div>
          <a href="tel:1544-4701" className="btn btn-primary">1544-4701</a>
        </div>
      </SubPageLayout>
    </main>
  )
}

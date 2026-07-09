import { Metadata } from 'next'
import SubPageLayout from '@/components/SubPageLayout'
import InquiryForm from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: '온라인 문의 — 뉴스온',
  description: '뉴스온 언론홍보·보도자료 배포 서비스에 대한 무료 견적을 온라인으로 간편하게 신청하세요. 전담 AE가 평균 2시간 이내에 브랜드 상황에 맞춘 맞춤 답변을 드립니다.',
  alternates: { canonical: '/inquiry' },
  openGraph: {
    title: '온라인 문의 — 뉴스온',
    description: '뉴스온 언론홍보·보도자료 배포 서비스에 대한 무료 견적을 온라인으로 간편하게 신청하세요. 전담 AE가 평균 2시간 이내에 브랜드 상황에 맞춘 맞춤 답변을 드립니다.',
    url: '/inquiry',
    type: 'website',
  },
}

interface InquiryPageProps {
  searchParams: Promise<{ name?: string; tel?: string; service?: string }>
}

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const params = await searchParams
  const prefillMessage = params.service ? `[홈페이지에서 선택한 관심 서비스: ${params.service}]\n\n` : ''

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
        showConsultBtn={false}
      >
        <h2 className="content-h2">무료 견적 신청</h2>
        <p className="content-lead">간단한 정보만 남겨주시면 전담 AE가 브랜드 상황에 맞춘 맞춤 견적을 전달드립니다. 모든 정보는 상담 목적으로만 사용되며 엄격히 관리됩니다.</p>

        <InquiryForm
          defaultName={params.name}
          defaultTel={params.tel}
          defaultMessage={prefillMessage}
        />

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

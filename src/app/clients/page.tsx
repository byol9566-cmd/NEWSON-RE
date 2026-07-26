import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { clientListRepository } from '@/lib/clients/repository'

export const metadata: Metadata = {
  title: '클라이언트 — 뉴스온',
  description: '뉴스온과 함께 언론홍보를 진행한 3,500개 이상의 기업·기관 파트너 레퍼런스를 소개합니다. 대기업부터 스타트업까지 다양한 산업군의 클라이언트가 뉴스온을 신뢰하고 선택했습니다.',
  alternates: { canonical: '/clients' },
  openGraph: {
    title: '클라이언트 — 뉴스온',
    description: '뉴스온과 함께 언론홍보를 진행한 3,500개 이상의 기업·기관 파트너 레퍼런스를 소개합니다. 대기업부터 스타트업까지 다양한 산업군의 클라이언트가 뉴스온을 신뢰하고 선택했습니다.',
    url: '/clients',
    type: 'website',
  },
}

export default async function ClientsPage() {
  const [clients, admin] = await Promise.all([clientListRepository.list(), isAdmin()])

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CLIENTS"
        title="함께한 파트너"
        sub="금융·의료·IT·유통·공공까지 — 뉴스온과 함께한 3,500개 이상의 기업과 기관."
        breadcrumb="CLIENTS"
        sidebarHeading="Clients"
        sidebarItems={[
          { label: '파트너 목록', href: '/clients', active: true },
        ]}
      >
        <h2 className="content-h2">뉴스온을 선택한 기업들</h2>
        <p className="content-lead">금융, 의료, IT, 유통, 교육, 공공기관까지 다양한 분야의 기업들과 함께하고 있습니다. 각 산업 특성에 맞는 맞춤형 커뮤니케이션 전략을 제공합니다.</p>

        {admin && (
          <p className="content-lead">
            <Link href="/clients/admin" className="btn btn-line">고객사 관리 →</Link>
          </p>
        )}

        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">3,500<span>+</span></div><div className="stat-label">누적 파트너</div></div>
          <div className="stat-cell"><div className="stat-num">908<span>+</span></div><div className="stat-label">제휴 언론사</div></div>
          <div className="stat-cell"><div className="stat-num">15<span>년</span></div><div className="stat-label">업력</div></div>
          <div className="stat-cell"><div className="stat-num">87<span>%</span></div><div className="stat-label">재의뢰율</div></div>
        </div>

        <h3 className="content-h3">주요 고객사</h3>
        <div className="clients-grid-text">
          {clients.map((name, i) => (
            <div key={`${name}-${i}`} className="client-cell">{name}</div>
          ))}
        </div>

        <div className="cta-box">
          <div>
            <strong>귀사의 브랜드도 함께하세요</strong>
            <p>맞춤 레퍼런스와 성공 사례를 확인하실 수 있습니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">상담 신청 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}

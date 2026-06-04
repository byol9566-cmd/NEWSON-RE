import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '클라이언트 — 뉴스온',
  description: '뉴스온과 함께한 1,500개 이상 기업·기관 파트너 레퍼런스.',
}

const CLIENTS = [
  '린나이코리아', '미소빌딩연구소', '(주)마켓비', '(주)티엘비코리아',
  '서울약사신협협동조합', '고운세상피부과', '명지혼혜병원', '한국경제연구원',
  '신한카드', 'KB국민은행', '하나투어', 'CJ ENM',
  '대한무역투자진흥공사', '한국관광공사', '중소벤처기업부', '서울시 금천구',
  '현대엠엔소프트', '삼성웰스토리', 'LG유플러스', '네이버클라우드',
  '카카오모빌리티', '쿠팡', '배달의민족', '야놀자',
  '당근마켓', '토스', '우아한형제들', '마켓컬리',
]

export default function ClientsPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CLIENTS"
        title="함께한 파트너"
        sub="금융·의료·IT·유통·공공까지 — 뉴스온과 함께한 1,500개 이상의 기업과 기관."
        breadcrumb="CLIENTS"
        sidebarHeading="Clients"
        sidebarItems={[
          { label: '파트너 목록', href: '/clients', active: true },
        ]}
      >
        <h2 className="content-h2">뉴스온을 선택한 기업들</h2>
        <p className="content-lead">금융, 의료, IT, 유통, 교육, 공공기관까지 다양한 분야의 기업들과 함께하고 있습니다. 각 산업 특성에 맞는 맞춤형 커뮤니케이션 전략을 제공합니다.</p>

        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">1,500<span>+</span></div><div className="stat-label">누적 파트너</div></div>
          <div className="stat-cell"><div className="stat-num">200<span>+</span></div><div className="stat-label">제휴 언론사</div></div>
          <div className="stat-cell"><div className="stat-num">15<span>년</span></div><div className="stat-label">업력</div></div>
          <div className="stat-cell"><div className="stat-num">87<span>%</span></div><div className="stat-label">재의뢰율</div></div>
        </div>

        <h3 className="content-h3">주요 고객사</h3>
        <div className="clients-grid-text">
          {CLIENTS.map((name) => (
            <div key={name} className="client-cell">{name}</div>
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

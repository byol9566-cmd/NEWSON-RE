import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '보도자료 사례 — 뉴스온',
  description: '뉴스온이 배포한 주요 보도자료 사례 — 금융·의료·IT·유통 등 다양한 산업 분야의 성공 사례를 확인하세요.',
}

const PRESS_ITEMS = [
  {
    num: '01',
    title: 'L사, AI 기반 신규 금융 플랫폼 출시 — 핀테크 업계 판도 바꿀까',
    desc: '매일경제·한국경제·서울경제 등 주요 경제지 12개 매체 동시 게재 · 네이버 뉴스 메인 노출 48시간 유지',
    date: '2026.04.10',
  },
  {
    num: '02',
    title: 'S제약, 차세대 면역항암제 임상 3상 성공 — 글로벌 시장 진출 초읽기',
    desc: '메디컬투데이·데일리메디·청년의사 등 의약전문지 8개 매체 + 주요 일간지 5개 매체 게재',
    date: '2026.03.28',
  },
  {
    num: '03',
    title: 'K푸드, 동남아 프랜차이즈 200호점 돌파 — K-콘텐츠 타고 수출 확대',
    desc: '식품외식경제·한국경제·이데일리 등 15개 매체 게재 · 다음 검색 연관 키워드 반영',
    date: '2026.03.15',
  },
  {
    num: '04',
    title: 'H건설, 프리미엄 레지던스 브랜드 런칭 — 강남권 2,000세대 규모 분양',
    desc: '부동산114·머니투데이·건설경제 등 부동산·경제지 10개 매체 게재 · 네이버 부동산 탭 노출',
    date: '2026.03.02',
  },
  {
    num: '05',
    title: 'T스타트업, 시리즈B 300억 투자 유치 — 글로벌 유니콘 대열 합류',
    desc: '벤처스퀘어·플래텀·아이티조선 등 IT·스타트업 전문지 + 일간지 종합 18개 매체 게재',
    date: '2026.02.20',
  },
  {
    num: '06',
    title: 'C대표 단독 인터뷰 — "ESG는 비용이 아닌 투자, 장기 관점이 답이다"',
    desc: '한국경제·매일경제 인터뷰 기획기사 · 심층 대담 형식 2페이지 구성 · 네이버 뉴스 메인 배치',
    date: '2026.02.08',
  },
  {
    num: '07',
    title: 'M뷰티, 일본 현지 매장 오픈 — 한류 타고 프리미엄 K-뷰티 확산',
    desc: '코스모닝·뷰티경제·어패럴뉴스 등 뷰티전문지 + 경제지 12개 매체 게재 · 네이버 블로그 파워블로거 50명 동시 발행',
    date: '2026.01.25',
  },
  {
    num: '08',
    title: 'G에듀테크, 대학 산학협력 MOU — 디지털 교육 혁신 본격화',
    desc: '교육부출입 교육전문지 + 경제지 · IT전문지 통합 14개 매체 게재 · 다음 뉴스 연관 검색어 반영',
    date: '2026.01.12',
  },
]

export default function PressReleasePage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CASE STUDY"
        title="보도자료 사례"
        sub="실제 언론에 게재된 주요 기사 리스트 — 산업별 메시지 전략과 노출 결과를 확인하세요."
        breadcrumb="PRESS"
        sidebarHeading="사업분야"
        sidebarItems={[
          { label: '전체 서비스', href: '/business' },
          { label: '보도자료 사례', href: '/pressrelease', active: true },
          { label: '비용 안내', href: '/pricing' },
        ]}
      >
        <h2 className="content-h2">주요 배포 사례</h2>
        <p className="content-lead">금융·의료·IT·유통 등 다양한 산업의 클라이언트가 뉴스온을 통해 주요 일간지와 포털 메인에 노출된 사례입니다. 클라이언트 보안상 브랜드명은 일부 마스킹 처리되었습니다.</p>

        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">468,000<span>+</span></div><div className="stat-label">누적 배포</div></div>
          <div className="stat-cell"><div className="stat-num">908<span>+</span></div><div className="stat-label">제휴 언론사</div></div>
          <div className="stat-cell"><div className="stat-num">98<span>%</span></div><div className="stat-label">네이버 노출</div></div>
          <div className="stat-cell"><div className="stat-num">2<span>h</span></div><div className="stat-label">평균 게재 속도</div></div>
        </div>

        <h3 className="content-h3">최근 배포 리스트</h3>
        <div className="press-list">
          {PRESS_ITEMS.map((item) => (
            <div key={item.num} className="press-item">
              <span className="pi-num">{item.num}</span>
              <div className="pi-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span className="pi-date">{item.date}</span>
            </div>
          ))}
        </div>

        <div className="cta-box">
          <div>
            <strong>귀사 브랜드의 성공 사례도 만들고 싶으신가요?</strong>
            <p>산업별 최적화된 배포 전략을 제안드립니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">맞춤 전략 상담 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}

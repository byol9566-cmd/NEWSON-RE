import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '사업분야 — 뉴스온',
  description: '뉴스온의 언론홍보·보도자료 배포·네이버 블로그 게재·위기관리 커뮤니케이션 서비스 안내.',
}

export default function BusinessPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="BUSINESS"
        title="사업분야"
        sub="보도자료 배포, 네이버 블로그 게재, 위기관리 커뮤니케이션 — 언론홍보의 처음부터 끝까지."
        breadcrumb="BUSINESS"
        sidebarHeading="사업분야"
        sidebarItems={[
          { label: '전체 서비스', href: '/business', active: true },
          { label: '보도자료 사례', href: '/pressrelease' },
          { label: '비용 안내', href: '/pricing' },
        ]}
      >
        <h2 className="content-h2">원스톱 언론홍보 서비스</h2>
        <p className="content-lead">언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에 처리합니다. 908개 제휴 언론사 네트워크와 15년간 쌓아온 기자·편집국 신뢰관계로 브랜드 메시지를 정확하게 전달합니다.</p>

        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">908<span>+</span></div><div className="stat-label">제휴 언론사</div></div>
          <div className="stat-cell"><div className="stat-num">468,000<span>+</span></div><div className="stat-label">누적 보도</div></div>
          <div className="stat-cell"><div className="stat-num">2<span>시간</span></div><div className="stat-label">평균 게재 속도</div></div>
          <div className="stat-cell"><div className="stat-num">98<span>%</span></div><div className="stat-label">네이버 검색 노출</div></div>
        </div>

        <h3 className="content-h3">6가지 핵심 서비스</h3>
        <div className="services-list">
          <div className="svc-cell">
            <div className="svc-num">01 / CORE</div>
            <h3>보도자료 배포</h3>
            <p>주요 일간지·경제지·산업지·지역지까지 908개 제휴 언론사에 동시 송출합니다. 매체별 편집 데스크에 맞춘 형식으로 기사 채택률을 극대화합니다.</p>
          </div>
          <div className="svc-cell">
            <div className="svc-num">02 / DIGITAL</div>
            <h3>네이버 블로그 게재</h3>
            <p>상위 파워블로거 네트워크를 통해 브랜드 검색 시 상단 노출을 확보합니다. VIEW 탭·모바일 검색 반영까지 최적화된 블로그 발행 전략.</p>
          </div>
          <div className="svc-cell">
            <div className="svc-num">03 / EDITORIAL</div>
            <h3>기사형 광고 · 인터뷰</h3>
            <p>대표이사 인터뷰, 기업 심층 기획기사, 제품·서비스 리뷰 기사까지 — 언론의 시선으로 브랜드를 조명하는 에디토리얼 콘텐츠.</p>
          </div>
          <div className="svc-cell">
            <div className="svc-num">04 / CRISIS</div>
            <h3>위기관리 · 정정 대응</h3>
            <p>부정 기사·악성 루머 발생 시 긍정 보도자료 집중 송출로 검색 순위를 밀어내고, 필요 시 정정 보도·반론 기사 협의를 지원합니다.</p>
          </div>
          <div className="svc-cell">
            <div className="svc-num">05 / SEARCH</div>
            <h3>포털 노출 최적화</h3>
            <p>네이버·다음 통합검색, 뉴스 탭, 연관 검색어까지 — 키워드 전략과 송출 타이밍을 조정해 포털 노출을 전방위로 관리합니다.</p>
          </div>
          <div className="svc-cell">
            <div className="svc-num">06 / COPY</div>
            <h3>보도자료 대필 · 기획</h3>
            <p>전문 카피라이터와 에디터가 브랜드 핵심 메시지를 인터뷰한 뒤 기사 형식으로 작성합니다. 헤드라인 A/B 테스트와 리드 문단 최적화 포함.</p>
          </div>
        </div>

        <h3 className="content-h3">진행 프로세스</h3>
        <ol className="timeline-list">
          <li><span className="tl-year">01</span><span className="tl-text"><strong>상담 · 견적 (당일)</strong> — 전담 AE가 브랜드 상황·홍보 목적·예산을 파악하고 맞춤 견적을 전달드립니다.</span></li>
          <li><span className="tl-year">02</span><span className="tl-text"><strong>기획 · 원고 작성 (1~2일)</strong> — 핵심 메시지 정리 → 헤드라인 도출 → 기사 형식 원고 작성 → 초안 컨펌.</span></li>
          <li><span className="tl-year">03</span><span className="tl-text"><strong>매체 선정 · 송출 (1일)</strong> — 브랜드 산업군과 타깃에 맞는 매체 리스트를 구성하고 편집국에 동시 송출합니다.</span></li>
          <li><span className="tl-year">04</span><span className="tl-text"><strong>게재 확인 · 리포트 (2~24시간)</strong> — 실제 게재된 기사 URL 리스트를 실시간으로 전달하고, 포털 검색 반영까지 추적합니다.</span></li>
          <li><span className="tl-year">05</span><span className="tl-text"><strong>사후 관리 · 확장 (지속)</strong> — 반응 모니터링, 2차 파생 기사 유도, 네이버 블로그·SNS 확산까지 이어서 관리합니다.</span></li>
        </ol>

        <div className="cta-box">
          <div>
            <strong>어떤 서비스가 필요하신가요?</strong>
            <p>전담 AE가 브랜드에 가장 효과적인 배포 전략을 설계해 드립니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">무료 견적 받기 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}

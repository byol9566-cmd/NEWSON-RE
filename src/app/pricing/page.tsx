import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '언론홍보 비용 — 뉴스온',
  description: '뉴스온 보도자료 배포 비용을 매체 등급별로 투명하게 안내합니다. 건당 55,000원부터 660,000원까지 예산에 맞는 등급을 선택하고, 브랜드 상황에 맞춘 맞춤 견적 상담도 받아보세요.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: '언론홍보 비용 — 뉴스온',
    description: '뉴스온 보도자료 배포 비용을 매체 등급별로 투명하게 안내합니다. 건당 55,000원부터 660,000원까지 예산에 맞는 등급을 선택하고, 브랜드 상황에 맞춘 맞춤 견적 상담도 받아보세요.',
    url: '/pricing',
    type: 'website',
  },
}

export default function PricingPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="PRICING"
        title="언론홍보 비용"
        sub="매체 등급별 건당 단가와 투명한 견적. 필요한 매체 범위만큼만 선택하실 수 있습니다."
        breadcrumb="PRICING"
        sidebarHeading="언론홍보 비용"
        sidebarItems={[
          { label: '비용 및 절차', href: '/pricing', active: true },
          { label: '사업분야', href: '/business' },
        ]}
      >
        <h2 className="content-h2">보도자료 배포 비용</h2>
        <p className="content-lead">보도자료 1건 배포 기준의 매체 등급별 단가입니다. 등급이 높을수록 더 많은 주요·상위 매체에 송출되며, 매체 구성·건수에 따라 맞춤 견적도 가능합니다.</p>

        <div className="price-table-wrap">
          <table className="price-table">
            <thead>
              <tr><th scope="col">등급</th><th scope="col">건당 비용</th><th scope="col">배포 매체</th></tr>
            </thead>
            <tbody>
              <tr><td className="pt-name">보도자료 배포</td><td className="pt-cost">55,000원</td><td>기본 온라인 매체 송출</td></tr>
              <tr><td className="pt-name">마이너</td><td className="pt-cost">110,000원</td><td>중소·전문 온라인 매체 확대</td></tr>
              <tr><td className="pt-name">중급</td><td className="pt-cost">165,000원</td><td>일반 일간지·전문지 포함</td></tr>
              <tr><td className="pt-name">프리미엄</td><td className="pt-cost">275,000원</td><td>주요 경제지·산업지 포함</td></tr>
              <tr><td className="pt-name">메이저</td><td className="pt-cost">440,000원</td><td>주요 종합 일간지 포함</td></tr>
              <tr><td className="pt-name">TOP 메이저</td><td className="pt-cost">660,000원</td><td>최상위 종합지·방송·통신사까지</td></tr>
            </tbody>
          </table>
        </div>
        <p className="price-note">※ 표시 금액은 보도자료 1건 배포 기준입니다. 매체 구성·건수에 따라 맞춤 견적이 가능하며, 정식 사업자로 전자세금계산서 발행이 가능합니다.</p>

        <div className="pay-box">
          <span className="pay-label">결제 계좌</span>
          <span className="pay-value">하나은행 <strong>260-910013-86604</strong> · 예금주 (주)뉴스온미디어</span>
        </div>

        <h3 className="content-h3">이용 절차</h3>
        <ol className="timeline-list">
          <li><span className="tl-year">01</span><span className="tl-text"><strong>상담 · 신청</strong> — 전담 AE가 브랜드 목표에 맞는 전략을 컨설팅합니다</span></li>
          <li><span className="tl-year">02</span><span className="tl-text"><strong>보도자료 준비</strong> — 초안 검토, 키워드 최적화, 이미지 준비 (대필 가능)</span></li>
          <li><span className="tl-year">03</span><span className="tl-text"><strong>언론사 배포</strong> — 선정 언론사 동시 송출, 예약 송출 가능</span></li>
          <li><span className="tl-year">04</span><span className="tl-text"><strong>포털 + 블로그 노출</strong> — 네이버·다음·구글 노출 + 블로그 동시 게재</span></li>
          <li><span className="tl-year">05</span><span className="tl-text"><strong>결과 보고</strong> — 노출 URL과 조회수, 도달 분석을 메일로 전달</span></li>
        </ol>

        <h3 className="content-h3">자주 묻는 질문</h3>
        <div className="faq-simple">
          <details>
            <summary>배포 후 기사 확인까지 얼마나 걸리나요?</summary>
            <div className="faq-a">평균 2~24시간 내 주요 언론사에 게재되며, 네이버·다음 포털 반영은 최대 48시간 소요됩니다. 실시간 URL 리스트로 확인하실 수 있습니다.</div>
          </details>
          <details>
            <summary>보도자료 원고가 없는데 대필이 가능한가요?</summary>
            <div className="faq-a">전문 카피라이터가 브랜드 핵심 메시지를 인터뷰한 뒤 기사 형식으로 작성해 드립니다. 원고가 없으셔도 대필·편집 서비스로 진행 가능합니다.</div>
          </details>
          <details>
            <summary>부정 기사가 나왔을 때 정정 요청이 가능한가요?</summary>
            <div className="faq-a">긍정 보도자료를 집중 송출해 검색 순위를 밀어내 부정 콘텐츠의 도달을 최소화하는 위기관리 대응을 제공합니다. 필요 시 정정 보도·반론 기사 협의를 지원합니다.</div>
          </details>
          <details>
            <summary>주말·공휴일에도 송출 가능한가요?</summary>
            <div className="faq-a">네, 24시간 송출 가능합니다. 다만 주말·공휴일 송출은 평일 대비 노출 효율이 낮아 권장하지 않습니다.</div>
          </details>
          <details>
            <summary>세금계산서 발행이 되나요?</summary>
            <div className="faq-a">정식 사업자로 전자세금계산서 발행이 가능합니다. 결제 완료 후 익일 발행해 드립니다.</div>
          </details>
        </div>

        <div className="cta-box">
          <div>
            <strong>맞춤 견적이 필요하신가요?</strong>
            <p>브랜드 상황을 분석해 최적 배포 등급을 제안해 드립니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">무료 견적 신청 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}

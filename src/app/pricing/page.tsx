import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'
import {
  FULL_MEDIA_LIST,
  FULL_MEDIA_LIST_INTRO,
  PRICING_TIERS,
  TIER_ONE_DESCRIPTION,
  type PricingTier,
} from './media-list'

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

const NOTICE_LINES = [
  '언론사 1곳 게재 비용입니다.',
  '중급매체 이상 서비스 신청 시 < 보도자료 배포 > + < 블로그 게재 > 2가지 서비스를 추가로 진행해 드립니다.',
  '블로그는 뉴스온 공식 블로그 계정입니다.',
  '부가가치세(VAT) 포함 금액입니다.',
]

/** 이 개수를 넘는 매체 리스트는 접힌(details) 상태로 노출 */
const COLLAPSE_THRESHOLD = 12

function TierMedia({ tier }: { tier: PricingTier }) {
  if (tier.media.length === 0) {
    return <p className="ptier-desc">{TIER_ONE_DESCRIPTION}</p>
  }

  const chips = (
    <ul className="media-chips">
      {tier.media.map((name, i) => (
        <li key={`${name}-${i}`}>{name}</li>
      ))}
    </ul>
  )

  if (tier.media.length <= COLLAPSE_THRESHOLD) {
    return chips
  }

  return (
    <details className="media-box">
      <summary>게재 가능 매체 전체 보기</summary>
      {chips}
    </details>
  )
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

        <ul className="pricing-notice" aria-label="비용 안내 사항">
          {NOTICE_LINES.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <div className="price-table-wrap">
          <table className="price-table">
            <thead>
              <tr><th scope="col">등급</th><th scope="col">건당 비용 (VAT 포함)</th><th scope="col">배포 매체</th></tr>
            </thead>
            <tbody>
              {PRICING_TIERS.map((tier) => (
                <tr key={tier.name}>
                  <td className="pt-name">{tier.name}</td>
                  <td className="pt-cost">{tier.price}</td>
                  <td>{tier.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="price-note">※ 표시 금액은 보도자료 1건 배포 기준, 부가가치세(VAT) 포함 금액입니다. 매체 구성·건수에 따라 맞춤 견적이 가능하며, 정식 사업자로 전자세금계산서 발행이 가능합니다.</p>

        <div className="pay-box">
          <span className="pay-label">결제 계좌</span>
          <span className="pay-value">하나은행 <strong>260-910013-86604</strong> · 예금주 (주)뉴스온미디어</span>
        </div>

        <h3 className="content-h3">등급별 게재 매체 안내</h3>
        <div className="ptier-group">
          {PRICING_TIERS.map((tier) => (
            <section className="ptier-block" key={tier.name} aria-label={tier.name}>
              <div className="ptier-head">
                <h4 className="ptier-name">{tier.name}</h4>
                <span className="ptier-price">{tier.price} <small>(VAT 포함)</small></span>
              </div>
              <TierMedia tier={tier} />
            </section>
          ))}
        </div>

        <h3 className="content-h3">908개 언론사 리스트</h3>
        <p className="content-lead">{FULL_MEDIA_LIST_INTRO}</p>
        <details className="media-box">
          <summary>908개 언론사 전체 리스트 보기</summary>
          <p className="media-list-panel">{FULL_MEDIA_LIST}</p>
        </details>

        <h3 className="content-h3">이용 절차</h3>
        <ol className="timeline-list">
          <li><span className="tl-year">01</span><span className="tl-text"><strong>상담 · 신청</strong> — 전담 AE가 브랜드 목표에 맞는 전략을 컨설팅합니다</span></li>
          <li><span className="tl-year">02</span><span className="tl-text"><strong>보도자료 준비</strong> — 초안 검토, 키워드 최적화, 이미지 준비 (대필 가능)</span></li>
          <li><span className="tl-year">03</span><span className="tl-text"><strong>언론사 배포</strong> — 선정 언론사 동시 송출, 예약 송출 가능</span></li>
          <li><span className="tl-year">04</span><span className="tl-text"><strong>포털 + 블로그 노출</strong> — 네이버·다음·구글 노출 + 블로그 동시 게재</span></li>
          <li><span className="tl-year">05</span><span className="tl-text"><strong>결과 보고</strong> — 노출 URL과 조회수, 도달 분석을 메일로 전달</span></li>
        </ol>

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

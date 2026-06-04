import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '언론홍보 비용 — 뉴스온',
  description: '뉴스온 언론홍보 비용 안내. 합리적 단가의 3가지 패키지와 맞춤 견적 서비스.',
}

export default function PricingPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="PRICING"
        title="언론홍보 비용"
        sub="합리적인 단가와 투명한 견적. 필요한 범위만큼만 선택하는 맞춤 패키지."
        breadcrumb="PRICING"
        sidebarHeading="언론홍보 비용"
        sidebarItems={[
          { label: '패키지 및 절차', href: '/pricing', active: true },
          { label: '사업분야', href: '/business' },
        ]}
      >
        <h2 className="content-h2">필요한 범위만큼, 투명한 견적</h2>
        <p className="content-lead">브랜드 규모와 홍보 목표에 맞춘 3가지 기본 패키지를 제공합니다. 기업 특성이 명확하다면 완전 맞춤 견적도 가능합니다.</p>

        <div className="pricing-tiers">
          <div className="tier">
            <span className="tier-name">BASIC</span>
            <div className="tier-title">스타트업 패키지</div>
            <div className="tier-price"><span className="tp-num">80</span><span className="tp-suffix">만원~</span></div>
            <ul className="tier-list">
              <li>핵심 언론사 30개 배포</li>
              <li>보도자료 1건 송출</li>
              <li>네이버·다음 포털 노출</li>
              <li>배포 결과 리포트</li>
            </ul>
            <Link href="/inquiry" className="tier-cta">문의하기</Link>
          </div>

          <div className="tier recommended">
            <span className="tier-ribbon">추천</span>
            <span className="tier-name">STANDARD</span>
            <div className="tier-title">중견기업 패키지</div>
            <div className="tier-price"><span className="tp-num">180</span><span className="tp-suffix">만원~</span></div>
            <ul className="tier-list">
              <li>주요 언론사 100개 배포</li>
              <li>보도자료 1건 + 네이버 블로그 게재</li>
              <li>대필·편집 서비스 포함</li>
              <li>키워드 최적화</li>
              <li>상세 노출 리포트</li>
            </ul>
            <Link href="/inquiry" className="tier-cta">문의하기</Link>
          </div>

          <div className="tier">
            <span className="tier-name">PREMIUM</span>
            <div className="tier-title">대기업 패키지</div>
            <div className="tier-price"><span className="tp-num">350</span><span className="tp-suffix">만원~</span></div>
            <ul className="tier-list">
              <li>전 언론사 200개 배포</li>
              <li>보도자료 + 블로그 + 인터뷰 기사</li>
              <li>전담 AE 상주 컨설팅</li>
              <li>위기관리·정정 대응</li>
              <li>월간 브랜드 리포트</li>
            </ul>
            <Link href="/inquiry" className="tier-cta">문의하기</Link>
          </div>
        </div>

        <h3 className="content-h3">이용 절차</h3>
        <ol className="timeline-list">
          <li><span className="tl-year">01</span><span className="tl-text"><strong>상담 · 신청</strong> — 전담 AE가 브랜드 목표에 맞는 전략을 컨설팅합니다</span></li>
          <li><span className="tl-year">02</span><span className="tl-text"><strong>보도자료 준비</strong> — 초안 검토, 키워드 최적화, 이미지 준비 (대필 가능)</span></li>
          <li><span className="tl-year">03</span><span className="tl-text"><strong>언론사 배포</strong> — 선정 언론사 동시 송출, 예약 송출 가능</span></li>
          <li><span className="tl-year">04</span><span className="tl-text"><strong>포털 + 블로그 노출</strong> — 네이버·다음·구글 노출 + 블로그 동시 게재</span></li>
          <li><span className="tl-year">05</span><span className="tl-text"><strong>결과 보고</strong> — 노출 URL과 조회수, 도달 분석 리포트 전달</span></li>
        </ol>

        <h3 className="content-h3">자주 묻는 질문</h3>
        <div className="faq-simple">
          <details>
            <summary>배포 후 기사 확인까지 얼마나 걸리나요?</summary>
            <div className="faq-a">평균 2~24시간 내 주요 언론사에 게재되며, 네이버·다음 포털 반영은 최대 48시간 소요됩니다. 실시간 URL 리스트로 확인하실 수 있습니다.</div>
          </details>
          <details>
            <summary>보도자료 원고가 없는데 대필이 가능한가요?</summary>
            <div className="faq-a">전문 카피라이터가 브랜드 핵심 메시지를 인터뷰한 뒤 기사 형식으로 작성해 드립니다. STANDARD 이상 패키지에 기본 포함됩니다.</div>
          </details>
          <details>
            <summary>부정 기사가 나왔을 때 정정 요청이 가능한가요?</summary>
            <div className="faq-a">PREMIUM 패키지에서 제공됩니다. 긍정 보도자료로 검색 순위를 밀어내 부정 콘텐츠의 도달을 최소화합니다.</div>
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
            <p>브랜드 상황을 분석해 최적 패키지를 제안해 드립니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">무료 견적 신청 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}

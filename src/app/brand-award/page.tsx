import { Fragment } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

const BRAND_AWARDS = [
  { outlet: '조선일보', award: '대한민국 자산관리 1위' },
  { outlet: '조선일보', award: '한국소비자추천 1위' },
  { outlet: '스포츠서울', award: '한국감동서비스 1위' },
  { outlet: '스포츠서울', award: '고객선호브랜드 1위' },
  { outlet: '주간동아', award: '한국브랜드만족지수 1위' },
  { outlet: '주간동아', award: '대한민국 고객만족브랜드 1위' },
  { outlet: '중앙일보', award: '소비자만족브랜드대상' },
  { outlet: '중앙일보', award: '한국감동수출브랜드대상' },
  { outlet: '중앙일보', award: '고객감동우수브랜드대상' },
  { outlet: '중앙일보', award: '올해의우수브랜드대상' },
  { outlet: '한경BUSINESS', award: '대한민국우수브랜드대상' },
  { outlet: '한경BUSINESS', award: '고객만족도 1위' },
  { outlet: '한경BUSINESS', award: '대한민국신뢰브랜드 1위' },
  { outlet: '한경BUSINESS', award: '대한민국소비자선호도 1위' },
  { outlet: '한경BUSINESS', award: '대한민국브랜드대상' },
  { outlet: '한경BUSINESS', award: '대한민국브랜드만족도 1위' },
  { outlet: '한경BUSINESS', award: '한국소비자만족지수 1위' },
  { outlet: '한경BUSINESS', award: '고객만족브랜드대상' },
  { outlet: '한경BUSINESS', award: '프리미엄브랜드대상' },
  { outlet: '한경BUSINESS', award: '한국고객만족도 1위' },
  { outlet: '한경BUSINESS', award: '한국품질만족도 1위' },
]

const PROCESS_FLOW = [
  { title: '신청서 작성', desc: '브랜드 소개' },
  { title: '신청서 제출', desc: '신청서 접수' },
  { title: '심사 및 발표', desc: '수상 통보' },
  { title: '시상식', desc: '수상 혜택 제공' },
] as const

const BENEFIT_ITEMS = [
  '시상식 및 호텔 코스요리',
  '엠블럼',
  '상장 및 상패',
  '기업 인터뷰 영상 촬영',
  '신문/잡지 연합광고, 특집기사',
  '온라인 기사',
]

const EFFECT_ITEMS = [
  '브랜드 인지도 향상',
  '매출증대',
  '기업 히스토리 수상 기록',
  '기업에 대한 긍정적인 인식의 변화',
]

export const metadata: Metadata = {
  title: '브랜드대상 — 뉴스온',
  description: '뉴스온이 15년간 함께해온 브랜드대상 수상 기업 리스트와 신청 절차, 수상 특전을 소개합니다. 신문·잡지 연합광고, 특집기사 게재까지 지원하는 언론홍보 전문 커뮤니케이션 파트너 뉴스온과 함께하세요.',
  alternates: { canonical: '/brand-award' },
  openGraph: {
    title: '브랜드대상 — 뉴스온',
    description: '뉴스온이 15년간 함께해온 브랜드대상 수상 기업 리스트와 신청 절차, 수상 특전을 소개합니다. 신문·잡지 연합광고, 특집기사 게재까지 지원하는 언론홍보 전문 커뮤니케이션 파트너 뉴스온과 함께하세요.',
    url: '/brand-award',
    type: 'website',
  },
}

export default function BrandAwardPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ABOUT NEWSON"
        title="브랜드대상"
        sub="뉴스온은 15년간 대한민국 대표 기업들과 함께 언론홍보를 기획하고 실행해 왔습니다."
        breadcrumb="BRAND AWARD"
        sidebarHeading=""
        sidebarItems={[
          { label: '회사소개', href: '/company' },
          { label: '오시는 길', href: '/location' },
        ]}
      >
        <figure className="award-hero-figure">
          <div
            className="award-hero-img"
            style={{ backgroundImage: "url('/images/brand_awards_main.jpg')" }}
            role="img"
            aria-label="브랜드대상 시상식 무대"
          />
          <div className="award-hero-shade" />
          <figcaption className="award-hero-caption">
            <span className="ahc-eyebrow">BRAND AWARD CEREMONY</span>
            <span className="ahc-text">대한민국 대표 브랜드대상</span>
          </figcaption>
        </figure>

        <h2 className="content-h2">대한민국 대표 브랜드대상</h2>
        <p className="content-lead">15년간 축적된 언론홍보 노하우로 다수의 브랜드대상 수상 기업과 함께해왔습니다. 아래에서 수상 이력과 신청 절차, 수상 특전을 확인하세요.</p>

        <h3 className="content-h3">브랜드대상 리스트</h3>
        <div className="award-grid">
          {BRAND_AWARDS.map((item, i) => (
            <div key={`${item.outlet}-${i}`} className="award-card">
              <div className="award-year">{item.outlet}</div>
              <div className="award-title">{item.award}</div>
            </div>
          ))}
        </div>

        <div className="pf-block" role="group" aria-label="브랜드대상 신청 진행절차: 신청서 작성 → 신청서 제출 → 심사 및 발표 → 시상식">
          <h3 className="content-h3">진행절차 <span className="h3-sub">(PROCESS)</span></h3>
          <div className="pf-steps">
            {PROCESS_FLOW.map((step, i, arr) => (
              <Fragment key={step.title}>
                <div className="pf-step">
                  <div className="pf-circle">
                    <span className="pf-step-title">{step.title}</span>
                    <span className="pf-step-desc">{step.desc}</span>
                  </div>
                </div>
                {i < arr.length - 1 && <span className="pf-arrow" aria-hidden="true">›</span>}
              </Fragment>
            ))}
          </div>
        </div>
        <h3 className="content-h3">수상특전</h3>
        <div className="benefit-panel">
          <ol className="benefit-list">
            {BENEFIT_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <div className="benefit-media">
            <Image
              src="/images/brand-award-badges.jpg"
              width={619}
              height={233}
              alt="브랜드대상 수상 엠블럼 · 상패 · 브랜드선호도 1위 인증서"
              sizes="(max-width: 720px) 100vw, 400px"
            />
          </div>
        </div>

        <h3 className="content-h3">한국경제신문 연합광고</h3>
        <figure className="brand-award-graphic">
          <Image
            src="/images/brand-award-hankyung-ad.jpg"
            width={660}
            height={416}
            alt="한국경제신문 연합광고 지면 · 한국브랜드선호도 1위 인증 지면"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </figure>

        <h3 className="content-h3">한경BUSINESS 특집기사</h3>
        <figure className="brand-award-graphic">
          <Image
            src="/images/brand-award-hankyung-business.jpg"
            width={660}
            height={415}
            alt="한경BUSINESS 특집기사 지면 — 중소기업 다시 뛴다"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </figure>

        <h3 className="content-h3">기대효과</h3>
        <div className="benefit-panel">
          <ol className="benefit-list">
            {EFFECT_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <div className="benefit-media">
            <Image
              src="/images/brand-award-effect-medals.jpg"
              width={660}
              height={183}
              alt="브랜드대상 수상 메달 — KSBA · CSBA · KBBA · KBA 인증"
              sizes="(max-width: 720px) 100vw, 400px"
            />
          </div>
        </div>

        <div className="cta-box">
          <div>
            <strong>무료 견적 상담</strong>
            <p>전담 AE가 브랜드 상황에 맞춰 맞춤 전략을 제안합니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">견적 신청 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}

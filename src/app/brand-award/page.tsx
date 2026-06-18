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

export const metadata: Metadata = {
  title: '브랜드대상 — 뉴스온',
  description: '뉴스온이 선정한 브랜드대상 수상기업. 언론홍보 대행 15년 업력의 전문 커뮤니케이션 파트너.',
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
            <span className="ahc-text">대한민국 대표 브랜드를 만든 15년의 발자취</span>
          </figcaption>
        </figure>

        <h2 className="content-h2">대한민국 대표 언론홍보 전문기업</h2>
        <p className="content-lead">뉴스온은 보도자료 기획, 언론사 배포, 네이버 블로그 게재를 원스톱으로 제공하는 언론홍보 전문 대행사입니다. 908개 제휴 언론사 네트워크를 바탕으로 기업의 이야기를 가장 효과적인 매체에 전달합니다.</p>

        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">15<span>년</span></div><div className="stat-label">업력</div></div>
          <div className="stat-cell"><div className="stat-num">908<span>+</span></div><div className="stat-label">제휴 언론사</div></div>
          <div className="stat-cell"><div className="stat-num">3,500<span>+</span></div><div className="stat-label">누적 파트너사</div></div>
          <div className="stat-cell"><div className="stat-num">468,000<span>+</span></div><div className="stat-label">배포 보도자료</div></div>
        </div>

        <h3 className="content-h3">브랜드 대상 리스트</h3>
        <div className="award-grid">
          {BRAND_AWARDS.map((item, i) => (
            <div key={`${item.outlet}-${i}`} className="award-card">
              <div className="award-year">{item.outlet}</div>
              <div className="award-title">{item.award}</div>
            </div>
          ))}
        </div>

        <figure className="brand-award-graphic">
          <Image
            src="/images/brand-award-process.png"
            width={660}
            height={216}
            alt="브랜드대상 신청 진행절차 — 신청서 작성(브랜드 소개), 신청서 제출(접수), 심사 및 발표(수상 통보), 시상식(수상 혜택 제공)"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </figure>
        <figure className="brand-award-graphic">
          <Image
            src="/images/brand-award-benefits.png"
            width={660}
            height={2047}
            alt="브랜드대상 수상특전 · 한국경제신문 연합광고 · 한경BUSINESS 특집기사 · 기대효과 안내"
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </figure>

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

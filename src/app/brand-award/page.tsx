import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

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
        sidebarHeading="회사소개"
        sidebarItems={[
          { label: '브랜드대상', href: '/brand-award', active: true },
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
        <p className="content-lead">뉴스온은 보도자료 기획, 언론사 배포, 네이버 블로그 게재를 원스톱으로 제공하는 언론홍보 전문 대행사입니다. 200개 이상의 제휴 언론사 네트워크를 바탕으로 기업의 이야기를 가장 효과적인 매체에 전달합니다.</p>

        <div className="stat-row">
          <div className="stat-cell"><div className="stat-num">15<span>년</span></div><div className="stat-label">업력</div></div>
          <div className="stat-cell"><div className="stat-num">200<span>+</span></div><div className="stat-label">제휴 언론사</div></div>
          <div className="stat-cell"><div className="stat-num">1,500<span>+</span></div><div className="stat-label">누적 파트너사</div></div>
          <div className="stat-cell"><div className="stat-num">12,800<span>+</span></div><div className="stat-label">배포 보도자료</div></div>
        </div>

        <h3 className="content-h3">주요 수상 및 인증</h3>
        <div className="award-grid">
          <div className="award-card">
            <div className="award-year">2024</div>
            <div className="award-title">대한민국 브랜드대상</div>
            <div className="award-desc">PR·언론홍보 부문 우수기업 선정</div>
          </div>
          <div className="award-card">
            <div className="award-year">2023</div>
            <div className="award-title">한국서비스품질지수</div>
            <div className="award-desc">미디어 커뮤니케이션 부문 1위</div>
          </div>
          <div className="award-card">
            <div className="award-year">2022</div>
            <div className="award-title">고객만족 브랜드대상</div>
            <div className="award-desc">언론홍보 대행 서비스 부문</div>
          </div>
          <div className="award-card">
            <div className="award-year">2021</div>
            <div className="award-title">소비자가 뽑은 브랜드</div>
            <div className="award-desc">신뢰도 높은 홍보 대행사</div>
          </div>
        </div>

        <h3 className="content-h3">회사 연혁</h3>
        <ol className="timeline-list">
          <li><span className="tl-year">2024</span><span className="tl-text">200개 언론사 제휴 달성 / 네이버 블로그 게재 서비스 개시</span></li>
          <li><span className="tl-year">2022</span><span className="tl-text">가산디지털단지 본사 확장 이전 / 연 3,000건 보도자료 배포 돌파</span></li>
          <li><span className="tl-year">2020</span><span className="tl-text">위기관리 커뮤니케이션 전담팀 신설</span></li>
          <li><span className="tl-year">2017</span><span className="tl-text">누적 파트너사 1,000개 돌파 / 업계 주요 협력 매체 100개 돌파</span></li>
          <li><span className="tl-year">2014</span><span className="tl-text">기사형 광고·인터뷰 기획 서비스 출시</span></li>
          <li><span className="tl-year">2010</span><span className="tl-text">뉴스온 설립 / 보도자료 배포 서비스 개시</span></li>
        </ol>

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

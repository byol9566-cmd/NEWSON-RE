import type { Metadata } from 'next'
import './globals.css'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PhoneClickTracker from '@/components/PhoneClickTracker'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.newson.co.kr'),
  title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
  // 첫 문장은 80자 내 완결(네이버 노출 기준), 둘째 문장은 구글의 긴 스니펫용
  description: '908개 제휴 언론사, 15년 노하우의 언론홍보 전문 대행사 뉴스온. 보도자료 배포부터 네이버 블로그 게재까지 원스톱. 건당 55,000원부터 투명한 가격, 보도자료 대필과 기사형 광고까지 제공합니다.',
  keywords: '언론홍보,보도자료배포,네이버블로그,기사광고,언론홍보대행사,뉴스온,보도자료,포털노출,뉴스마케팅',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'Dg5I1rd5LBUjp7D872B-Gj5A1ztyipG4XuKS4TMaoII',
    other: {
      'naver-site-verification': 'b3ae9e15c16190b53ff1f5746ea157961f5ffdb0',
    },
  },
  openGraph: {
    title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
    description: '908개 제휴 언론사, 15년 노하우의 언론홍보 전문 대행사 뉴스온. 보도자료 배포부터 네이버 블로그 게재까지 원스톱',
    type: 'website',
    url: 'https://www.newson.co.kr/',
    siteName: '뉴스온 (NEWSON)',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
    description: '908개 제휴 언론사, 15년 노하우의 언론홍보 전문 대행사 뉴스온. 보도자료 배포부터 네이버 블로그 게재까지 원스톱',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: '뉴스온 (NEWSON)',
              description: '언론홍보·보도자료 배포·네이버 블로그 원스톱 대행사',
              image: 'https://www.newson.co.kr/opengraph-image',
              telephone: '1544-4701',
              email: 'newsmarketing@daum.net',
              priceRange: '₩55,000 - ₩660,000',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '미사대로 550, C동 10층 1001호',
                addressLocality: '하남시',
                addressRegion: '경기도',
                addressCountry: 'KR',
              },
              openingHours: 'Mo-Fr 09:00-18:00',
              url: 'https://www.newson.co.kr/',
              sameAs: [
                'https://www.newsonwire.co.kr',
                'https://www.issue24.co.kr',
                'https://blog.naver.com/newpic2018',
                'https://www.newsjebo.co.kr',
                'https://www.newsjebowebzine.co.kr',
              ],
            }),
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <PhoneClickTracker />
        <a className="skip-link" href="#main-content">본문 바로가기</a>
        <div className="masthead-line" aria-hidden="true" />
        <TopBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.newson.co.kr'),
  title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
  description: '뉴스온은 언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에 처리하는 언론홍보 전문 대행사입니다. 908개 제휴 언론사, 3,000여 명의 기자 네트워크를 기반으로 효과적인 뉴스마케팅 전략을 제공하며, 15년간 축적된 노하우로 브랜드 신뢰도를 높여드립니다.',
  keywords: '언론홍보,보도자료배포,네이버블로그,기사광고,언론홍보대행사,뉴스온,보도자료,포털노출,뉴스마케팅',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
    description: '908개 제휴 언론사, 3,000여 명의 기자 네트워크로 언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에 처리하는 뉴스마케팅 전문 대행사, 뉴스온입니다.',
    type: 'website',
    url: 'https://www.newson.co.kr/',
    siteName: '뉴스온 (NEWSON)',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
    description: '908개 제휴 언론사, 3,000여 명의 기자 네트워크로 언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에 처리하는 뉴스마케팅 전문 대행사, 뉴스온입니다.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <GoogleAnalytics />
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

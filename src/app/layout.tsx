import type { Metadata } from 'next'
import './globals.css'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
  description: '뉴스온은 언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에 처리하는 언론홍보 전문 대행사입니다. 200개 이상 제휴 언론사 네트워크를 보유하고 있습니다.',
  keywords: '언론홍보,보도자료배포,네이버블로그,기사광고,언론홍보대행사,뉴스온,보도자료,포털노출',
  openGraph: {
    title: '뉴스온 — 언론홍보·보도자료배포·네이버블로그 원스톱 대행',
    description: '언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에. 200개 이상 제휴 언론사 네트워크.',
    type: 'website',
    url: 'https://www.newson.co.kr/',
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
              telephone: '031-758-0215',
              email: 'newsmarketing@daum.net',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '가산디지털2로 98, 2동 1306호',
                addressLocality: '금천구',
                addressRegion: '서울특별시',
                addressCountry: 'KR',
              },
              openingHours: 'Mo-Fr 09:00-18:00',
              url: 'https://www.newson.co.kr/',
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

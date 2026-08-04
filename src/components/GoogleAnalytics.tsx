'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// 관리자 전용 화면은 GA 수집에서 제외해 실제 고객 데이터만 남긴다
const ADMIN_PATH_PATTERN = /^\/(pressrelease\/(write|login|[^/]+\/edit)|pricing\/admin)/

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const pathname = usePathname()

  useEffect(() => {
    if (!gaId) return
    ;(window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] =
      ADMIN_PATH_PATTERN.test(pathname)
  }, [gaId, pathname])

  if (!gaId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window['ga-disable-${gaId}'] = /${ADMIN_PATH_PATTERN.source}/.test(location.pathname);
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}

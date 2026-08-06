'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

// 사이트 전체의 tel: 링크 클릭을 GA phone_call 이벤트로 수집한다 (전화 전환 가시화)
export default function PhoneClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href^="tel:"]')
      if (!anchor) return
      trackEvent('phone_call', { page_path: window.location.pathname })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

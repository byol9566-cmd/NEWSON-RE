type GtagFunction = (...args: unknown[]) => void

type WindowWithGtag = Window & { gtag?: GtagFunction }

// gtag 미탑재 환경(GA ID 미설정, 광고 차단기 등)에서는 조용히 무시한다
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const gtag = (window as WindowWithGtag).gtag
  if (typeof gtag !== 'function') return
  gtag('event', name, params ?? {})
}

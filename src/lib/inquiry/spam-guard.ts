const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
// 한국 통신사 CGNAT로 여러 사용자가 IP를 공유할 수 있어 여유 있게 설정
const RATE_LIMIT_MAX_REQUESTS = 10
const REQUEST_LOG_CLEANUP_THRESHOLD = 1000

// 서버리스 환경에서는 인스턴스별로 유지되는 메모리 카운터라 완벽하진 않지만,
// 동일 인스턴스로 몰리는 봇의 연속 제출을 차단하는 1차 방어선 역할을 한다.
const requestLog = new Map<string, number[]>()

export function isRateLimited(ip: string, now = Date.now()): boolean {
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const recent = (requestLog.get(ip) ?? []).filter((t) => t > windowStart)

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent)
    return true
  }

  requestLog.set(ip, [...recent, now])

  if (requestLog.size > REQUEST_LOG_CLEANUP_THRESHOLD) {
    for (const [key, stamps] of requestLog) {
      if (stamps.every((t) => t <= windowStart)) {
        requestLog.delete(key)
      }
    }
  }

  return false
}

// x-real-ip는 프록시(Vercel/nginx)가 실제 TCP 연결 기준으로 설정하므로 신뢰 가능.
// x-forwarded-for는 왼쪽 항목이 클라이언트 조작 가능하므로 마지막(프록시가 덧붙인) 항목만 사용.
// 신뢰할 IP를 못 찾으면 null을 반환해 레이트 리밋을 건너뛴다(오차단 방지, fail-open).
export function getClientIp(request: Request): string | null {
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
    const last = parts[parts.length - 1]
    if (last) return last
  }

  return null
}

// 휴대폰(010...), 지역번호(02/031...), 인터넷전화(070), 대표번호(15xx/16xx/18xx) 허용
export function isValidKoreanPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-.()]/g, '').replace(/^\+82/, '0')
  return /^0\d{8,10}$/.test(digits) || /^1[568]\d{6}$/.test(digits)
}

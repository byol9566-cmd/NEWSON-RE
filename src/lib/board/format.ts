const KST_FORMATTER = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** ISO 문자열을 `2026.07.10 13:39` 형식(KST)으로 변환 */
export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  const parts = KST_FORMATTER.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? ''

  return `${get('year')}.${get('month')}.${get('day')} ${get('hour')}:${get('minute')}`
}

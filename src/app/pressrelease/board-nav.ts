export const BOARD_SIDEBAR = {
  heading: '사업분야',
  items: [
    { label: '전체 서비스', href: '/business' },
    { label: '보도자료 사례', href: '/pressrelease', active: true },
    { label: '비용 안내', href: '/pricing' },
  ],
} as const

export const BOARD_PAGE_SIZE = 15

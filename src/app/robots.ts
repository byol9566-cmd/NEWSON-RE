import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.newson.co.kr'
const isProduction = process.env.VERCEL_ENV === 'production'

// 관리자 전용 화면·API는 크롤 대상에서 제외한다 (크롤 예산 절약 + 불필요한 색인 방지)
const ADMIN_DISALLOW = [
  '/pressrelease/write',
  '/pressrelease/login',
  '/pressrelease/*/edit',
  '/pricing/admin',
  '/clients/admin',
  '/api/',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : undefined,
      disallow: isProduction ? ADMIN_DISALLOW : '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.newson.co.kr'
const isProduction = process.env.VERCEL_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : undefined,
      disallow: isProduction ? undefined : '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

import { MetadataRoute } from 'next'

const SITE_URL = 'https://www.newson.co.kr'

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/company', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/brand-award', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/business', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/clients', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/pressrelease', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/customer', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/inquiry', changeFrequency: 'yearly', priority: 0.9 },
  { path: '/location', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}

import { MetadataRoute } from 'next'
import { postRepository } from '@/lib/board/repository'

const SITE_URL = 'https://www.newson.co.kr'

/** 사이트맵을 1시간마다 재생성해 새 보도자료 사례 글을 반영한다 */
export const revalidate = 3600

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/company', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/brand-award', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/business', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/clients', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/pressrelease', changeFrequency: 'daily', priority: 0.7 },
  { path: '/customer', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/inquiry', changeFrequency: 'yearly', priority: 0.9 },
  { path: '/location', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
]

const MAX_SITEMAP_POSTS = 1000

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  let postEntries: MetadataRoute.Sitemap = []
  try {
    const { items } = await postRepository.list({ page: 1, pageSize: MAX_SITEMAP_POSTS })
    postEntries = items.map((post) => ({
      url: `${SITE_URL}/pressrelease/${post.id}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  } catch (error) {
    // 저장소 접근 실패 시에도 정적 사이트맵은 항상 제공한다
    console.error('sitemap: failed to load press release posts', error)
  }

  return [...staticEntries, ...postEntries]
}

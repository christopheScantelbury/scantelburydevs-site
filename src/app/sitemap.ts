import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const SITE_URL = 'https://www.scantelburydevs.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const posts = getAllPosts()
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

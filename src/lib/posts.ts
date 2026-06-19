import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: number
}

export interface Post extends PostMeta {
  content: string
}

// YAML converte datas não-quotadas (date: 2026-05-15) em objeto Date.
// Normalizamos sempre para string "AAAA-MM-DD" — assim o resto do código
// (formatDate, ordenação) pode confiar que `date` é string.
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return value == null ? '' : String(value)
}

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
}

export function getAllPosts(): PostMeta[] {
  return getPostFiles()
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        date: normalizeDate(data.date),
        tags: data.tags ?? [],
        readTime: data.readTime ?? 5,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: normalizeDate(data.date),
    tags: data.tags ?? [],
    readTime: data.readTime ?? 5,
    content,
  }
}

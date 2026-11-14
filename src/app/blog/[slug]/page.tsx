import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { NewsletterCapture } from '@/components/NewsletterCapture'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article' },
  }
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const html = marked(post.content) as string

  return (
    <main className="bg-navy min-h-screen text-offwhite">
      <SiteHeader current="blog" />

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-10 pb-24">
        <Link href="/blog" className="inline-flex items-center min-h-[44px] mb-4 font-mono text-[13px] text-steel hover:text-offwhite transition-colors tracking-[0.04em] no-underline">
          ← Insights
        </Link>
        {/* Tags */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] tracking-widest text-cyan bg-cyan/[0.08] border border-cyan/20 rounded px-2 py-0.5 uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-display text-[26px] md:text-[34px] font-bold tracking-tight text-offwhite mb-5 leading-[1.2]">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex gap-4 mb-12 font-mono text-xs text-steel">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} min de leitura</span>
        </div>

        {/* Content */}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="prose-blog"
        />

        {/* Newsletter capture */}
        <NewsletterCapture />

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-cyan/[0.15] bg-cyan/[0.04]">
          <p className="font-sans text-lg font-bold text-offwhite mb-2">
            Precisando de ajuda com seu projeto?
          </p>
          <p className="text-steel text-sm mb-5">
            A ScantelburyDevs constrói, lança e opera software em produção — de integração fiscal a sistemas sob medida.
          </p>
          <Link href="/#contact"
            className="inline-flex items-center min-h-[44px] px-6 rounded-lg bg-cyan text-navy font-mono text-[13px] font-medium tracking-[0.06em] no-underline hover:opacity-90 transition-opacity">
            Falar com a gente →
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

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
      {/* Nav */}
      <nav className="border-b border-white/[0.06] py-5">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <svg width="28" height="28" viewBox="0 0 72 72" fill="none">
              <path d="M36 12L58 24V48L36 60L14 48V24L36 12Z" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="2"/>
              <rect x="22" y="24" width="20" height="4" rx="2" fill="#00D4FF"/>
              <rect x="30" y="33" width="20" height="4" rx="2" fill="#00D4FF"/>
              <rect x="22" y="42" width="20" height="4" rx="2" fill="#00D4FF"/>
            </svg>
            <span className="font-sans font-bold text-base text-offwhite">
              Scantelbury<span className="text-cyan">Devs</span>
            </span>
          </Link>
          <Link href="/blog" className="font-mono text-[13px] text-steel hover:text-offwhite transition-colors tracking-[0.04em]">
            ← Insights
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        {/* Tags */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] tracking-widest text-cyan bg-cyan/[0.08] border border-cyan/20 rounded px-2 py-0.5 uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-sans text-3xl md:text-4xl font-extrabold text-offwhite mb-5 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex gap-4 mb-12 font-mono text-xs text-steel/60">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} min de leitura</span>
        </div>

        {/* Content */}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="prose-blog"
        />

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-cyan/[0.15] bg-cyan/[0.04]">
          <p className="font-sans text-lg font-bold text-offwhite mb-2">
            Precisando de ajuda com seu projeto?
          </p>
          <p className="text-steel text-sm mb-5">
            A ScantelburyDevs constrói, lança e opera software em produção.
          </p>
          <Link href="/#contact"
            className="inline-block px-6 py-2.5 rounded-lg bg-cyan text-navy font-bold text-sm no-underline hover:bg-cyan/90 transition-colors">
            Falar com a equipe →
          </Link>
        </div>
      </article>
    </main>
  )
}

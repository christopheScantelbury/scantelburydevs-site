import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Artigos técnicos e de negócios sobre desenvolvimento de software, migração de sistemas e engenharia de produto.',
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="bg-navy min-h-screen text-offwhite">
      <SiteHeader current="blog" />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <p className="label-tag">Insights</p>
        <h1 className="section-title">
          Engenharia e negócios<br />
          <span className="text-cyan">sem enrolação.</span>
        </h1>
        <p className="text-steel-light text-base max-w-lg leading-relaxed">
          Artigos práticos sobre desenvolvimento de software, arquitetura e decisões técnicas que impactam o negócio.
        </p>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-steel">Nenhum artigo publicado ainda.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline group">
                <article className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan/30 hover:bg-cyan/[0.04] transition-all duration-200 cursor-pointer">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags.map(tag => (
                          <span key={tag} className="font-mono text-[10px] tracking-widest text-cyan bg-cyan/[0.08] border border-cyan/20 rounded px-2 py-0.5 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-display text-[17px] md:text-lg font-bold text-offwhite mb-2.5 leading-snug group-hover:text-cyan transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-steel text-sm leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-xs text-steel mb-1">{formatDate(post.date)}</p>
                      <p className="font-mono text-[11px] text-steel">{post.readTime} min</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  )
}

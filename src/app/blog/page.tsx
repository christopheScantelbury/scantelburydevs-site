import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

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
      {/* Nav */}
      <nav className="border-b border-white/[0.06] py-5">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
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
          <Link href="/#contact" className="font-mono text-[13px] text-cyan tracking-[0.05em] hover:text-offwhite transition-colors">
            Falar com a equipe →
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-3 uppercase">Insights</p>
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-offwhite mb-4 leading-tight">
          Engenharia e negócios<br />
          <span className="text-cyan">sem enrolação.</span>
        </h1>
        <p className="text-steel text-base max-w-lg leading-relaxed">
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
                      <h2 className="font-sans text-xl font-bold text-offwhite mb-2.5 leading-snug group-hover:text-cyan transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-steel text-sm leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-xs text-steel/60 mb-1">{formatDate(post.date)}</p>
                      <p className="font-mono text-[11px] text-steel/50">{post.readTime} min</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

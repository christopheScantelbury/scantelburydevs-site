'use client'

import { useState } from 'react'
import { trackLead } from '@/lib/analytics'

export function NewsletterCapture() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('E-mail inválido.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: 'Newsletter / Material rico',
          message: 'Solicitou checklist: 12 perguntas antes de contratar um dev',
          source: 'blog-newsletter',
        }),
      })
      if (!res.ok) throw new Error('fail')
      trackLead({ source: 'form', projectType: 'Newsletter / Material rico', lang: 'pt' })
      setDone(true)
    } catch {
      setError('Erro ao enviar. Tente de novo em alguns segundos.')
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="border border-cyan/40 rounded-lg p-6 bg-cyan/5 my-12">
        <p className="text-cyan font-bold text-lg mb-2">✓ Recebemos seu e-mail</p>
        <p className="text-steel text-sm leading-relaxed">
          Te mandamos o checklist em alguns minutos. Enquanto isso, quer falar agora?{' '}
          <a
            href="https://wa.me/5547997352380?text=Ol%C3%A1%2C+baixei+o+checklist+e+quero+conversar"
            className="text-cyan hover:text-offwhite"
          >
            Chama no WhatsApp →
          </a>
        </p>
      </div>
    )
  }

  return (
    <aside className="border border-white/[0.08] rounded-lg p-6 md:p-8 my-12 bg-white/[0.015]">
      <p className="font-mono text-xs tracking-[0.15em] text-cyan mb-2 uppercase">Material gratuito</p>
      <h3 className="font-sans text-xl md:text-2xl font-extrabold text-offwhite mb-2">
        Checklist: 12 perguntas antes de contratar um dev
      </h3>
      <p className="text-steel text-sm mb-5 leading-relaxed">
        Pra você não cair em proposta vaga, dev que some no meio ou sistema entregue sem documentação. Deixa o e-mail que mandamos o PDF.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="flex-1 bg-navy border border-white/[0.08] rounded px-4 py-2.5 text-offwhite placeholder:text-steel focus:outline-none focus:border-cyan transition-colors"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-cyan text-navy font-sans font-bold px-5 py-2.5 rounded hover:bg-cyan/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {submitting ? 'Enviando...' : 'Receber checklist'}
        </button>
      </form>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      <p className="text-steel text-xs mt-3">
        Sem spam. Cancelamento em 1 clique.
      </p>
    </aside>
  )
}

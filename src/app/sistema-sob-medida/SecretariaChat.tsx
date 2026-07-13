'use client'

import { useState, useRef, useEffect } from 'react'
import { trackChatOpen, trackContact, trackLead } from '@/lib/analytics'
import { useProactiveChat } from '@/lib/useProactiveChat'

interface Message { role: 'user' | 'assistant'; content: string }

const ABERTURA =
  'Oi, tudo bem? Que bom receber seu contato. Vou te ajudar a entender se faz sentido criar um sistema, app ou automação para a sua empresa. Me conta uma coisa: o que você está tentando resolver hoje?'

const WHATSAPP_URL =
  'https://wa.me/5547997352380?text=Ol%C3%A1%2C+quero+um+diagn%C3%B3stico+gratuito+para+um+sistema+sob+medida'

export default function SecretariaChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: ABERTURA },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [resumoEnviado, setResumoEnviado] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { showBubble, dismissBubble } = useProactiveChat({
    isOpen: open,
    onAutoOpen: () => { setOpen(true); trackChatOpen('auto') },
    storageKey: 'proactiveChat:lp',
    // Tráfego pago da LP sai em ~22s — o chat precisa aparecer antes disso.
    bubbleDelayMs: 4000,
    autoOpenDelayMs: 12000,
    scrollThreshold: 0.25,
  })

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const updated: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch('/api/secretaria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, content: m.content })),
          origem: 'landing page sistema-sob-medida',
          resumoEnviado,
        }),
      })
      const data = await res.json()
      const reply =
        data?.reply || 'Tive um problema aqui. Pode falar com a gente no WhatsApp: (47) 99735-2380'
      setMessages([...updated, { role: 'assistant', content: reply }])
      if (data?.resumoEnviado && !resumoEnviado) {
        setResumoEnviado(true)
        trackLead({ source: 'chat', projectType: 'Sistema sob medida', lang: 'pt' })
      }
    } catch {
      setMessages([
        ...updated,
        { role: 'assistant', content: 'Erro de conexão. Fale conosco: (47) 99735-2380' },
      ])
    }
    setLoading(false)
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan/20 animate-ping pointer-events-none" aria-hidden="true" />
      )}

      {/* Balão teaser proativo — convida sem abrir o modal */}
      {showBubble && !open && (
        <div className="fixed bottom-24 right-6 z-50 w-[260px] max-w-[calc(100vw-3rem)] animate-fade-up">
          <div className="relative bg-navy border border-cyan/25 rounded-2xl rounded-br-sm shadow-2xl">
            <button
              onClick={dismissBubble}
              aria-label="Dispensar"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-steel hover:text-offwhite hover:border-cyan/30 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <button
              onClick={() => { dismissBubble(); setOpen(true); trackChatOpen('bubble') }}
              className="text-left px-4 py-3.5 w-full"
            >
              <p className="font-sans text-[13px] text-offwhite leading-snug">
                Oi 👋 Quer um diagnóstico gratuito do seu sistema? É rápido e sem compromisso.
              </p>
              <p className="font-mono text-[10px] text-cyan mt-1.5 flex items-center gap-1">
                Começar
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </p>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => { const next = !o; if (next) trackChatOpen('manual'); return next })}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={open ? 'Fechar chat' : 'Abrir conversa com a assistente'}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {open && (
        <div
          role="dialog" aria-label="Conversa com a assistente comercial da ScantelburyDevs"
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col bg-navy border border-cyan/20 rounded-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02] flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 72 72" fill="none">
                <path d="M36 12L58 24V48L36 60L14 48V24L36 12Z" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="1.5"/>
                <rect x="22" y="24" width="20" height="4" rx="2" fill="#00D4FF"/>
                <rect x="30" y="33" width="20" height="4" rx="2" fill="#00D4FF"/>
                <rect x="22" y="42" width="20" height="4" rx="2" fill="#00D4FF"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-sans text-[13px] font-medium text-offwhite leading-none">Assistente ScantelburyDevs</p>
              <p className="font-mono text-[10px] text-cyan mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" aria-hidden="true" />
                Online agora
              </p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              aria-label="Ir para WhatsApp"
              onClick={() => trackContact('whatsapp_lp_chat')}
              className="font-mono text-[9px] text-steel tracking-[0.1em] border border-white/10 px-2 py-1.5 rounded hover:border-cyan/30 hover:text-cyan transition-colors min-h-[32px] flex items-center">
              WhatsApp
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 0, maxHeight: '360px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] px-3.5 py-2.5 rounded-xl font-sans text-[13px] leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-cyan text-navy font-medium rounded-br-sm'
                    : 'bg-white/[0.04] border border-white/[0.06] text-steel rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" aria-label="Digitando...">
                <div className="bg-white/[0.04] border border-white/[0.06] px-4 py-3 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06] flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Digite sua mensagem..."
              aria-label="Mensagem para a assistente"
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 font-sans text-[13px] text-offwhite placeholder:text-steel/60 focus:outline-none focus:border-cyan/40 min-h-[40px]"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Enviar mensagem"
              className="bg-cyan text-navy rounded-lg px-3.5 flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity min-h-[40px] min-w-[44px]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

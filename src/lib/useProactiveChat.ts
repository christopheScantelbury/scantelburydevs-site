import { useEffect, useRef, useState } from 'react'

/**
 * useProactiveChat — comportamento proativo (não-intrusivo) para o widget de chat.
 *
 *  1. Balão teaser: aparece após `bubbleDelayMs` (default 5s) convidando o
 *     visitante a conversar — SEM abrir o modal. Pode ser dispensado.
 *  2. Auto-open: abre o chat sozinho SOMENTE quando o visitante demonstra
 *     interesse — passou `autoOpenDelayMs` (default 25s) E rolou ao menos
 *     `scrollThreshold` (default 40%) da página. Evita pop-up na cara de quem
 *     acabou de entrar (o que aumenta rejeição e piora o Ads).
 *
 * Dispara no máximo UMA vez por sessão (sessionStorage). Se o usuário abrir o
 * chat manualmente ou dispensar o balão, nada mais é acionado.
 *
 * Respeita prefers-reduced-motion no lado visual (o balão não pulsa) — a lógica
 * de abertura continua igual.
 */

export interface UseProactiveChatOptions {
  /** Estado atual do chat (aberto?). */
  isOpen: boolean
  /** Callback para abrir o chat automaticamente. */
  onAutoOpen: () => void
  bubbleDelayMs?: number
  autoOpenDelayMs?: number
  /** Fração da página rolada (0–1) exigida para o auto-open. */
  scrollThreshold?: number
  /** Chave de sessão — use uma por página pra não colidir (home vs LP). */
  storageKey?: string
}

export function useProactiveChat({
  isOpen,
  onAutoOpen,
  bubbleDelayMs = 5000,
  autoOpenDelayMs = 25000,
  scrollThreshold = 0.4,
  storageKey = 'proactiveChat',
}: UseProactiveChatOptions) {
  const [showBubble, setShowBubble] = useState(false)

  // done = já abriu automaticamente, foi dispensado, ou aberto manualmente
  const doneRef = useRef(false)
  const isOpenRef = useRef(isOpen)
  const onAutoOpenRef = useRef(onAutoOpen)

  useEffect(() => { isOpenRef.current = isOpen }, [isOpen])
  useEffect(() => { onAutoOpenRef.current = onAutoOpen }, [onAutoOpen])

  function markDone() {
    doneRef.current = true
    try { window.sessionStorage.setItem(storageKey, '1') } catch { /* modo privado */ }
  }

  function dismissBubble() {
    setShowBubble(false)
    markDone()
  }

  // Se o usuário abre o chat manualmente, encerra qualquer comportamento proativo.
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false)
      markDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Timers + scroll (montam uma vez).
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (window.sessionStorage.getItem(storageKey)) { doneRef.current = true; return }
    } catch { /* ignore */ }

    let elapsed = false

    const scrolledFraction = () => {
      const doc = document.documentElement
      const denom = doc.scrollHeight - window.innerHeight
      if (denom <= 0) return 1 // página curta: considera "rolada"
      return window.scrollY / denom
    }

    const tryAutoOpen = () => {
      if (doneRef.current || isOpenRef.current) return
      if (elapsed && scrolledFraction() >= scrollThreshold) {
        markDone()
        setShowBubble(false)
        onAutoOpenRef.current()
        window.removeEventListener('scroll', onScroll)
      }
    }

    const onScroll = () => tryAutoOpen()

    const bubbleTimer = window.setTimeout(() => {
      if (!doneRef.current && !isOpenRef.current) setShowBubble(true)
    }, bubbleDelayMs)

    const openTimer = window.setTimeout(() => {
      elapsed = true
      tryAutoOpen()
    }, autoOpenDelayMs)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(bubbleTimer)
      window.clearTimeout(openTimer)
      window.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { showBubble, dismissBubble }
}

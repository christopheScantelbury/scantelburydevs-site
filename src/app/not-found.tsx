'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type Bug = { id: number; x: number; y: number; rot: number }

const GAME_DURATION = 20

export default function NotFound() {
  const arenaRef = useRef<HTMLDivElement>(null)
  const [bugs, setBugs] = useState<Bug[]>([])
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'playing' | 'over'>('idle')
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const nextId = useRef(0)

  // ── Tracking GA4 ───────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const path = window.location.pathname + window.location.search
    const referrer = document.referrer || '(direct)'
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_not_found', { page_path: path, referrer })
    }
    console.warn('[404]', { path, referrer })
  }, [])

  // ── Gera bug em posição aleatória ──────────────────────
  const spawnBug = useCallback(() => {
    const arena = arenaRef.current
    if (!arena) return
    const w = arena.clientWidth
    const h = arena.clientHeight
    const pad = 40
    const bug: Bug = {
      id: nextId.current++,
      x: pad + Math.random() * Math.max(0, w - pad * 2),
      y: pad + Math.random() * Math.max(0, h - pad * 2),
      rot: Math.random() * 360,
    }
    setBugs((prev) => [...prev, bug])
  }, [])

  // ── Loop do jogo: timer + spawn ────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return
    const tick = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(tick)
          setPhase('over')
          return 0
        }
        return t - 1
      })
    }, 1000)
    const spawn = setInterval(spawnBug, 700)
    spawnBug()
    return () => {
      clearInterval(tick)
      clearInterval(spawn)
    }
  }, [phase, spawnBug])

  // ── Reporta score final pro GA4 ───────────────────────
  useEffect(() => {
    if (phase !== 'over') return
    if (typeof window === 'undefined') return
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'bug_hunt_finished', { score })
    }
  }, [phase, score])

  const handleHit = (id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id))
    setScore((s) => s + 1)
  }

  const startGame = () => {
    setBugs([])
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setPhase('playing')
  }

  return (
    <main className="min-h-screen bg-navy text-offwhite px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Cabeçalho */}
        <header className="text-center mb-6">
          <p className="font-mono text-cyan text-xs tracking-tag uppercase mb-3">
            erro 404 · página não encontrada
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-2">
            Achamos um <span className="text-cyan">bug</span>.
          </h1>
          <p className="text-steel max-w-md mx-auto">
            Essa rota não existe — mas, já que está aqui, ajuda a caçar uns bugs?
          </p>
        </header>

        {/* HUD */}
        <div className="flex items-center justify-between font-mono text-sm mb-3 px-2">
          <span className="text-steel">
            BUGS: <span className="text-offwhite font-bold">{score}</span>
          </span>
          <span className="text-steel">
            TEMPO:{' '}
            <span className={`font-bold ${timeLeft <= 5 && phase === 'playing' ? 'text-cyan animate-pulse' : 'text-offwhite'}`}>
              {timeLeft.toString().padStart(2, '0')}s
            </span>
          </span>
        </div>

        {/* Arena */}
        <div
          ref={arenaRef}
          className="relative w-full h-[360px] md:h-[420px] rounded-xl border border-brand bg-navy-card overflow-hidden select-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        >
          {/* Glow ambiente */}
          <div className="absolute inset-0 pointer-events-none bg-glow-cyan opacity-50" />

          {/* Tela inicial */}
          {phase === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <p className="text-steel mb-5 text-center px-6">
                Clica nos bugs antes do tempo acabar. <br className="hidden sm:block" />
                Sem mouse? Aposte na precisão do toque.
              </p>
              <button
                onClick={startGame}
                className="px-7 py-3 rounded-md bg-cyan text-navy font-bold uppercase tracking-wider hover:bg-cyan-dark transition focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-navy"
              >
                ▶ Caçar bugs
              </button>
            </div>
          )}

          {/* Tela de fim */}
          {phase === 'over' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-navy/85 backdrop-blur-sm">
              <p className="font-mono text-cyan text-xs uppercase tracking-tag mb-2">deploy concluído</p>
              <h2 className="font-display text-5xl mb-1">{score}</h2>
              <p className="text-steel mb-1">{score === 1 ? 'bug caçado' : 'bugs caçados'}</p>
              <p className="text-steel text-sm mb-5">
                {score === 0
                  ? 'Bugs 1 × Você 0. Acontece.'
                  : score < 10
                  ? 'Bom QA. Quer fazer um teste sério com a gente?'
                  : score < 25
                  ? 'Reflexo de tester sênior. 👀'
                  : 'Você quebrou o jogo. Pode quebrar nosso staging também?'}
              </p>
              <button
                onClick={startGame}
                className="px-5 py-2.5 rounded-md border border-medium text-cyan font-mono text-sm uppercase tracking-wider hover:bg-navy-hover transition"
              >
                jogar de novo
              </button>
            </div>
          )}

          {/* Bugs */}
          {phase === 'playing' &&
            bugs.map((b) => (
              <button
                key={b.id}
                onClick={() => handleHit(b.id)}
                aria-label="Caçar bug"
                className="absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center text-2xl rounded-full hover:scale-125 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan"
                style={{
                  left: `${b.x}px`,
                  top: `${b.y}px`,
                  transform: `rotate(${b.rot}deg)`,
                  filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.6))',
                }}
              >
                🐛
              </button>
            ))}
        </div>

        {/* Saídas */}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-md bg-cyan text-navy font-medium hover:bg-cyan-dark transition"
          >
            Voltar para a home
          </Link>
          <Link
            href="/sistema-sob-medida"
            className="px-5 py-2.5 rounded-md border border-brand text-offwhite hover:bg-navy-hover transition"
          >
            Ver nossos serviços
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-md border border-brand text-offwhite hover:bg-navy-hover transition"
          >
            Ler o blog
          </Link>
        </div>
      </div>
    </main>
  )
}

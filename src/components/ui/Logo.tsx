import { cn } from '@/lib/utils'

interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      className={cn(className)}
      aria-label="ScantelburyDevs logo mark"
    >
      <path
        d="M36 4L64 20V52L36 68L8 52V20L36 4Z"
        stroke="#00D4FF" strokeWidth="1.5" fill="none" opacity="0.3"
      />
      <path
        d="M36 12L58 24V48L36 60L14 48V24L36 12Z"
        fill="#0A0F1E" stroke="#00D4FF" strokeWidth="1" opacity="0.7"
      />
      <rect x="22" y="24" width="20" height="4" rx="2" fill="#00D4FF" />
      <rect x="30" y="33" width="20" height="4" rx="2" fill="#00D4FF" />
      <rect x="22" y="42" width="20" height="4" rx="2" fill="#00D4FF" />
      <line x1="42" y1="28" x2="30" y2="33" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <line x1="30" y1="37" x2="42" y2="42" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = { sm: { mark: 24, text: 'text-base' }, md: { mark: 32, text: 'text-lg' }, lg: { mark: 44, text: 'text-2xl' } }
  const s = sizes[size]
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMark size={s.mark} />
      <span className={cn('font-display font-[800] tracking-tight text-offwhite', s.text)}>
        Scantelbury<span className="text-cyan">Devs</span>
      </span>
    </div>
  )
}

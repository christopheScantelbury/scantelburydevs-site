import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { mark: 22, text: 'text-[15px]' },
    md: { mark: 28, text: 'text-[18px]' },
    lg: { mark: 38, text: 'text-[24px]' },
  }
  const s = sizes[size]
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img src="/logo-mark.svg" alt="" width={s.mark} height={s.mark} aria-hidden="true" />
      <span className={cn('font-display font-[800] tracking-tight text-offwhite leading-none', s.text)}>
        Scantelbury<span className="text-cyan">Devs</span>
      </span>
    </div>
  )
}

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-mark.svg"
      alt="ScantelburyDevs"
      width={size}
      height={size}
      className={cn(className)}
    />
  )
}

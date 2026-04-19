import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { mark: 20, text: 'text-[13px]' },
    md: { mark: 22, text: 'text-[14px] md:text-[17px]', markMd: 26 },
    lg: { mark: 32, text: 'text-[20px]' },
  }

  if (size === 'md') {
    return (
      <div className={cn('flex items-center gap-1.5 md:gap-2', className)}>
        <img src="/logo-mark.svg" alt="" width={22} height={22}
          className="md:w-[27px] md:h-[27px]" aria-hidden="true" />
        <span className="font-display font-[800] tracking-tight text-offwhite leading-none text-[14px] md:text-[17px]">
          Scantelbury<span className="text-cyan">Devs</span>
        </span>
      </div>
    )
  }

  const s = sizes[size]
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
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

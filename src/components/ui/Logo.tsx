import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const heights = { sm: 28, md: 36, lg: 48 }
  const h = heights[size]
  return (
    <img
      src="/logo-horizontal-dark.svg"
      alt="ScantelburyDevs"
      height={h}
      style={{ height: h, width: 'auto' }}
      className={cn(className)}
    />
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

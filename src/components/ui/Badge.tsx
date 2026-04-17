import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'cyan' | 'blue' | 'steel'
}

export function Badge({ variant = 'cyan', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-mono text-[10px] tracking-[0.08em] px-2.5 py-1 rounded inline-block',
        {
          'bg-cyan/[0.08] border border-cyan/[0.18] text-cyan': variant === 'cyan',
          'bg-[#0088CC]/10 border border-[#0088CC]/20 text-[#5BB8F5]': variant === 'blue',
          'bg-steel/10 border border-steel/20 text-steel-light': variant === 'steel',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

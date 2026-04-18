import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // auditoria: min-h-[44px] para touch target WCAG 2.5.5
          'inline-flex items-center justify-center gap-2 font-mono tracking-[0.06em] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]',
          {
            // variant
            'bg-cyan text-navy font-medium hover:opacity-90 hover:-translate-y-px': variant === 'primary',
            // auditoria: outline com bg semi-transparente para melhor visibilidade em dark mode
            'border border-cyan/40 text-cyan bg-cyan/[0.05] hover:bg-cyan/15 hover:border-cyan/70': variant === 'outline',
            'text-steel hover:text-offwhite': variant === 'ghost',
            // size — auditoria: sm e md com min-w adequado para toque
            'text-[11px] px-4 min-w-[44px]': size === 'sm',
            'text-[13px] px-6 py-3': size === 'md',
            'text-[14px] px-8 py-3.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

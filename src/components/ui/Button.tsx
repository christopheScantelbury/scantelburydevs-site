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
          'inline-flex items-center justify-center gap-2 font-mono tracking-[0.06em] rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // variant
            'bg-cyan text-navy font-medium hover:opacity-90 hover:-translate-y-px': variant === 'primary',
            'border border-cyan/35 text-cyan hover:bg-cyan/10 hover:border-cyan/60': variant === 'outline',
            'text-steel hover:text-offwhite': variant === 'ghost',
            // size
            'text-[11px] px-4 py-2': size === 'sm',
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

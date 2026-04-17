import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
  topAccent?: boolean
}

export function Card({ hover = false, glow = false, topAccent = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-navy-card border border-white/[0.06] rounded-2xl relative overflow-hidden',
        hover && 'transition-all duration-300 hover:border-cyan/12 hover:-translate-y-1',
        glow && 'before:absolute before:inset-0 before:bg-glow-cyan before:pointer-events-none',
        className
      )}
      {...props}
    >
      {topAccent && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-8 pb-0', className)} {...props}>{children}</div>
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-8', className)} {...props}>{children}</div>
}

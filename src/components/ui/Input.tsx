import { cn } from '@/lib/utils'
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

const inputBase = 'w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-offwhite text-sm font-sans outline-none transition-colors duration-200 placeholder:text-steel focus:border-cyan/40'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(inputBase, className)} {...props} />
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(inputBase, 'resize-y min-h-[110px]', className)} {...props} />
  )
)
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(inputBase, 'appearance-none cursor-pointer [&>option]:bg-navy-mid', className)}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'

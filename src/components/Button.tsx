import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-dk active:bg-accent-dk',
  secondary:
    'border border-accent text-accent bg-white hover:bg-accent-lt active:bg-accent-lt',
  ghost:
    'text-accent bg-transparent hover:bg-accent-lt active:bg-accent-lt',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-md px-5 py-2.5',
  lg: 'text-lg px-7 py-3',
}

const base =
  'inline-flex items-center justify-center font-bold rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

type ButtonProps = {
  variant?: Variant
  size?: Size
} & ButtonHTMLAttributes<HTMLButtonElement>

type LinkButtonProps = {
  variant?: Variant
  size?: Size
  href: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function LinkButton({ variant = 'primary', size = 'md', className = '', href, children, ...props }: LinkButtonProps) {
  return (
    <a
      href={href}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'sun' | 'light' | 'ghost' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

interface StyleProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const base =
  'group/btn relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[0.005em] transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-700 text-white shadow-button hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-[0_14px_26px_-12px_rgb(26_100_61/0.7)]',
  secondary:
    'bg-white text-brand-800 ring-1 ring-inset ring-brand-300 hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-500',
  sun: 'bg-sun-400 text-brand-950 shadow-[0_10px_22px_-12px_rgb(226_176_20/0.9)] hover:-translate-y-0.5 hover:bg-sun-300',
  light: 'bg-white text-brand-900 hover:-translate-y-0.5 hover:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
  'outline-light': 'text-white ring-1 ring-inset ring-white/40 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-white/70',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
};

export function buttonClasses({ variant = 'primary', size = 'md', fullWidth }: StyleProps, className?: string) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
}

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, fullWidth, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, fullWidth }, className)} {...props} />;
}

type ButtonLinkProps = StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean };

export function ButtonLink({ variant, size, fullWidth, className, external, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses({ variant, size, fullWidth }, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (เปิดในแท็บใหม่)</span>}
    </a>
  );
}

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = 'left', className }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={cn(centered && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-600',
          )}
        >
          <span aria-hidden="true" className="h-px w-6 bg-sun-400" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-[1.75rem] font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-ink-soft sm:text-lg">{subtitle}</p>}
    </div>
  );
}

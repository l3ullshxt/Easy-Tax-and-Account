import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** หน่วงเวลา (ms) สำหรับไล่ลำดับ animation */
  delay?: number;
}

/** Fade-in + slide-up เมื่อ scroll มาถึง */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

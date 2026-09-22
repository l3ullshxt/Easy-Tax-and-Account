import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

/** เส้นทางหน้า เช่น หน้าแรก › บทความ › ชื่อบทความ (รายการสุดท้ายคือหน้าปัจจุบัน) */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="เส้นทางหน้าเว็บ">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="inline-flex min-w-0 items-center gap-1.5">
              {item.href && !isLast ? (
                <a href={item.href} className="rounded transition-colors duration-200 hover:text-brand-700 hover:underline">
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="line-clamp-1 font-medium text-brand-800">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3.5 shrink-0 text-brand-300" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

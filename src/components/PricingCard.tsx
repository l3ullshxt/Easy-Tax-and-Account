import { Check, Sparkles } from 'lucide-react';
import type { PricingPlan } from '../types';
import { cn } from '../lib/cn';
import { Button } from './ui/Button';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  const highlighted = Boolean(plan.highlighted);
  const titleId = `plan-${plan.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'relative flex w-full flex-col rounded-[1.75rem] p-7 transition duration-300 ease-out sm:p-8',
        highlighted
          ? 'bg-cream-50 shadow-lift ring-2 ring-brand-600 lg:-my-4 lg:py-11'
          : 'border border-brand-100 bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift',
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1 rounded-full bg-sun-400 px-3.5 py-1 text-sm font-bold text-brand-950 shadow-[0_6px_16px_-8px_rgb(226_176_20/0.9)]">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {plan.badge}
        </span>
      )}

      <header>
        <h3 id={titleId} className="text-sm font-bold tracking-[0.16em] text-brand-600">
          {plan.name}
        </h3>
        <p className="mt-1 text-[0.9375rem] text-ink-soft">{plan.tagline}</p>
      </header>

      <div className="mt-6 border-b border-dashed border-brand-200 pb-6">
        <p className="flex flex-wrap items-baseline gap-x-2">
          {plan.pricePrefix && <span className="text-sm font-medium text-ink-muted">{plan.pricePrefix}</span>}
          <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
            <span className="text-[2.5rem] font-bold leading-none tracking-tight text-brand-900">{plan.price}</span>
            <span className="text-sm font-medium text-ink-muted">{plan.unit}</span>
          </span>
        </p>
        <p className="mt-2.5 text-[0.8125rem] text-ink-muted">* {plan.priceNote}</p>
      </div>

      <ul className="mt-6 space-y-3" aria-label={`สิ่งที่ได้รับในแพ็กเกจ ${plan.name}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[0.9375rem] text-ink">
            <span
              aria-hidden="true"
              className={cn(
                'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                highlighted ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700',
              )}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        fullWidth
        variant={highlighted ? 'primary' : 'secondary'}
        className="mt-8"
        onClick={() => onSelect(plan)}
        aria-label={`${plan.ctaLabel} แพ็กเกจ ${plan.name}`}
      >
        {plan.ctaLabel}
      </Button>
    </article>
  );
}

import { ArrowRight } from 'lucide-react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onInquire: (service: Service) => void;
}

export function ServiceCard({ service, onInquire }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <article className="group relative flex h-full gap-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift md:flex-col md:gap-0 md:p-7">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700 md:size-14">
        <Icon className="size-6 md:size-7" strokeWidth={1.7} aria-hidden="true" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[1.0625rem] font-bold leading-snug text-brand-900 md:mt-6 md:text-xl">{service.title}</h3>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft md:mt-2">{service.description}</p>

        <button
          type="button"
          onClick={() => onInquire(service)}
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-3 text-sm font-semibold text-brand-700 transition-colors duration-200 after:absolute after:inset-0 after:rounded-3xl hover:text-brand-900 focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-500 md:pt-6"
        >
          สอบถามบริการนี้
          <span className="sr-only">: {service.title}</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

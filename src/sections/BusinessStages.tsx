import { businessStages } from '../data/stages';
import type { BusinessStage } from '../types';
import { cn } from '../lib/cn';
import { Reveal } from '../components/ui/Reveal';

const toneStyles: Record<BusinessStage['tone'], { card: string; badge: string; icon: string }> = {
  mint: {
    card: 'bg-brand-50 border-brand-100',
    badge: 'bg-brand-600 text-white',
    icon: 'bg-white text-brand-600',
  },
  sun: {
    card: 'bg-sun-50 border-sun-100',
    badge: 'bg-sun-400 text-brand-950',
    icon: 'bg-white text-brand-700',
  },
  sage: {
    card: 'bg-[#eef6f1] border-brand-100',
    badge: 'bg-brand-800 text-white',
    icon: 'bg-white text-brand-700',
  },
};

export function BusinessStages() {
  return (
    <section id="stages" aria-labelledby="stages-title" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span aria-hidden="true" className="h-px w-6 bg-sun-400" />
            Grow with Easy
            <span aria-hidden="true" className="h-px w-6 bg-sun-400" />
          </p>
          <h2 id="stages-title" className="text-[1.625rem] font-bold tracking-tight text-brand-900 min-[400px]:text-[1.75rem] sm:text-4xl lg:text-[2.5rem]">
            <span className="inline-block">ไม่ว่าธุรกิจคุณจะอยู่ช่วงไหน</span>{' '}
            <span className="inline-block">เราช่วยดูแลเรื่องบัญชีให้</span>
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            ทุกธุรกิจมีเส้นทางของตัวเอง <br className="sm:hidden" />
            เราอยู่ข้างคุณได้ทุกช่วง
          </p>

          <p
            aria-hidden="true"
            className="absolute -right-40 top-6 hidden rotate-[8deg] font-hand text-sm leading-snug text-brand-700 xl:block"
          >
            เติบโตไปด้วยกัน
            <br />
            กับ Easy :)
          </p>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
        {/* เส้นเชื่อมเส้นทางธุรกิจ */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[16%] top-[3.25rem] hidden border-t-2 border-dashed border-brand-200 md:block" />
        <ol className="relative grid gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">

          {businessStages.map((stage, index) => {
            const Icon = stage.icon;
            const tone = toneStyles[stage.tone];
            return (
              <li key={stage.id} className="relative">
                <Reveal delay={index * 90} className="h-full">
                  <article
                    className={cn(
                      'group flex h-full items-start gap-4 rounded-3xl border p-5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-6 md:flex-col md:gap-0 md:p-8',
                      tone.card,
                    )}
                  >
                    <div className="flex shrink-0 items-center justify-between md:mb-8 md:w-full">
                      <span
                        className={cn('grid size-11 shrink-0 place-items-center rounded-xl text-base font-bold shadow-sm', tone.badge)}
                      >
                        {stage.step}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'hidden size-16 place-items-center rounded-2xl shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 md:grid',
                          tone.icon,
                        )}
                      >
                        <Icon className="size-8" strokeWidth={1.6} />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 md:w-full">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-brand-900 sm:text-xl">{stage.title}</h3>
                        <Icon className="size-6 shrink-0 text-brand-600 md:hidden" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft md:mt-2.5">{stage.description}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}

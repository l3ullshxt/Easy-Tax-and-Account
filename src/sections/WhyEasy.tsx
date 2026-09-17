import { whyEasyFeatures } from '../data/whyEasy';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

export function WhyEasy() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-cream-50 py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="about-title"
            eyebrow="Why Easy"
            title={
              <>
                ทำไมต้อง <span className="whitespace-nowrap">Easy Tax &amp; Account?</span>
              </>
            }
            subtitle="มากกว่าการทำบัญชี คือ... เพื่อนที่ช่วยดูแลธุรกิจของคุณ"
            className="max-w-3xl"
          />
          <p aria-hidden="true" className="hidden rotate-[-4deg] font-hand text-sm leading-snug text-brand-700 lg:block lg:text-right">
            เราอยากให้คุณรู้สึก
            <br />
            เหมือนมีเพื่อนคอยดูแลอยู่ข้าง ๆ ♡
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-0 lg:rounded-[1.75rem] lg:border lg:border-brand-100 lg:bg-white lg:py-10 lg:shadow-soft">
            {whyEasyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.id}
                  className="group flex flex-col items-center rounded-3xl border border-brand-100 bg-white px-3 py-6 text-center sm:px-5 sm:py-7 lg:rounded-none lg:border-0 lg:border-l lg:border-brand-100 lg:bg-transparent lg:px-8 lg:py-2 lg:first:border-l-0"
                >
                  <span
                    aria-hidden="true"
                    className={
                      index === 1
                        ? 'grid size-14 place-items-center rounded-full bg-sun-100 text-brand-800 ring-1 ring-inset ring-sun-200 transition-transform duration-300 group-hover:-translate-y-1'
                        : 'grid size-14 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-transform duration-300 group-hover:-translate-y-1'
                    }
                  >
                    <Icon className="size-7" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-brand-900 sm:text-lg">{feature.title}</h3>
                  <p className="mt-1.5 max-w-[15rem] text-sm leading-relaxed text-ink-soft sm:text-[0.9375rem]">{feature.description}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

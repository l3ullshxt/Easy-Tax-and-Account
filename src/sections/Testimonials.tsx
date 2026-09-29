import { Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

/**
 * เสียงจากลูกค้า — แสดงเฉพาะเมื่อมีรีวิวจริงใน src/data/testimonials.ts
 * (ถ้ายังไม่มีรีวิว ส่วนนี้จะไม่ถูกแสดงเลย)
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="testimonials-title"
            eyebrow="Customer Stories"
            title="เสียงจากลูกค้า"
            subtitle="ความคิดเห็นจากเจ้าของธุรกิจที่ให้เราดูแลเรื่องบัญชี"
            align="center"
          />
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.quote}>
              <Reveal delay={index * 70} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl border border-brand-100 bg-cream-50 p-6 shadow-soft sm:p-7">
                  <Quote className="size-8 shrink-0 text-brand-300" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-ink">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-brand-100 pt-4">
                    <span className="block font-bold text-brand-900">{testimonial.name}</span>
                    <span className="mt-0.5 block text-sm text-ink-muted">
                      {testimonial.business}
                      {testimonial.service ? ` · ${testimonial.service}` : ''}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

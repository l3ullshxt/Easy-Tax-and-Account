import { ChevronDown, MessageCircle } from 'lucide-react';
import { faqs } from '../data/faqs';
import { useLeadForm } from '../context/LeadFormContext';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

export function Faq() {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-cream-50 py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="คำถามที่พบบ่อย"
            subtitle="รวมคำถามที่เจ้าของธุรกิจถามเราบ่อยที่สุด"
            align="center"
          />
        </Reveal>

        <Reveal delay={80} className="mx-auto mt-10 max-w-3xl lg:mt-14">
          <ul className="space-y-3">
            {faqs.map((faq) => (
              <li key={faq.question}>
                {/* ใช้ <details> ของ browser — ใช้งานด้วยคีย์บอร์ดได้ และเปิดอ่านได้แม้ JavaScript ยังไม่ทำงาน */}
                <details className="group rounded-2xl border border-brand-100 bg-white px-5 shadow-soft transition-colors duration-200 open:border-brand-200 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.0625rem] font-semibold text-brand-900 marker:content-[''] sm:text-lg">
                    {faq.question}
                    <ChevronDown
                      aria-hidden="true"
                      className="size-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-5 text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-ink-soft">ไม่เจอคำถามที่ต้องการ? ถามทีม Easy ได้เลย</p>
            <Button size="lg" onClick={() => openLeadForm({ mode: 'consult' })}>
              <MessageCircle aria-hidden="true" />
              ปรึกษาฟรี
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

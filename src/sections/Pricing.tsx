import { Info } from 'lucide-react';
import { pricingDisclaimer, pricingPlans } from '../data/pricing';
import { siteConfig } from '../config/site';
import { useLeadForm } from '../context/LeadFormContext';
import { PricingCard } from '../components/PricingCard';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

export function Pricing() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-brand-50/70 py-16 sm:py-20 lg:py-24"
    >
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="pricing-title"
            eyebrow="Pricing"
            title="บัญชีดี ไม่จำเป็นต้องแพง"
            subtitle="เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ"
          />

          {/* ภาพประกอบ + โน้ตลายมือ (Desktop) — เปลี่ยนรูปได้ที่ siteConfig.images.pricingDesk */}
          <div className="hidden items-end gap-5 lg:flex">
            <p aria-hidden="true" className="-rotate-[5deg] pb-4 text-right font-hand text-[0.9375rem] leading-snug text-brand-700">
              ค่าบริการชัดเจน
              <br />
              ไม่มีค่าใช้จ่ายแอบแฝง ♡
            </p>
            <img
              src={siteConfig.images.pricingDesk}
              alt="โต๊ะทำงานพร้อมแล็ปท็อปแสดงกราฟรายงานบัญชี แก้วกาแฟ และต้นไม้"
              width={340}
              height={520}
              loading="lazy"
              className="h-40 w-64 rounded-[1.5rem] object-cover object-[60%_72%] shadow-soft ring-1 ring-cream-300"
            />
          </div>
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-md gap-6 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <li key={plan.id} className="flex">
              <Reveal delay={index * 90} className="flex w-full">
                <PricingCard plan={plan} onSelect={(selected) => openLeadForm({ mode: 'quote', planId: selected.id })} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mx-auto mt-10 max-w-md lg:mt-12 lg:max-w-none">
          <p
            role="note"
            className="flex items-start gap-3 rounded-2xl border border-cream-300 bg-cream-100 px-5 py-4 text-[0.9375rem] leading-relaxed text-ink-soft lg:items-center lg:justify-center"
          >
            <Info className="mt-0.5 size-5 shrink-0 text-brand-600 lg:mt-0" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-brand-900">หมายเหตุ:</strong> {pricingDisclaimer}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

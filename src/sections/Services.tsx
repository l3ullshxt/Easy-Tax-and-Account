import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { useLeadForm } from '../context/LeadFormContext';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

export function Services() {
  const [showAll, setShowAll] = useState(false);
  const { openLeadForm } = useLeadForm();
  const visibleServices = showAll ? services : services.filter((service) => service.featured);
  const hasMore = services.some((service) => !service.featured);

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-cream-100 py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-title"
            eyebrow="Our Services"
            title="บริการของเรา"
            subtitle="ครบทุกเรื่องบัญชี ภาษี และธุรกิจของคุณ"
          />
          <p className="max-w-xs font-hand text-sm leading-snug text-brand-700 md:text-right" aria-hidden="true">
            ไม่แน่ใจว่าต้องใช้บริการไหน?
            <br className="hidden md:block" /> คุยกับพี่ Easy ก่อนได้เลย
          </p>
        </Reveal>

        <ul id="services-grid" className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {visibleServices.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={service.featured ? index * 60 : 0} className="h-full">
                <ServiceCard
                  service={service}
                  onInquire={(selected) => openLeadForm({ mode: 'quote', serviceId: selected.id })}
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="mt-10 flex justify-center lg:mt-12">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              aria-expanded={showAll}
              aria-controls="services-grid"
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll ? 'แสดงเฉพาะบริการหลัก' : 'ดูบริการทั้งหมด'}
              <ArrowRight
                aria-hidden="true"
                className={showAll ? '-rotate-90 transition-transform duration-200' : 'transition-transform duration-200 group-hover/btn:translate-x-1'}
              />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

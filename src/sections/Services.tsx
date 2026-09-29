import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { useLeadForm } from '../context/LeadFormContext';
import { SERVICES_PATH } from '../routes';
import { buttonClasses } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

const featuredServices = services.filter((service) => service.featured);

export function Services() {
  const { openLeadForm } = useLeadForm();

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
          {featuredServices.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={index * 60} className="h-full">
                <ServiceCard
                  service={service}
                  onInquire={(selected) => openLeadForm({ mode: 'quote', serviceId: selected.id })}
                />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center lg:mt-12">
          <a href={SERVICES_PATH} className={buttonClasses({ variant: 'secondary', size: 'lg' }, 'w-full sm:w-auto')}>
            ดูบริการทั้งหมด ({services.length} บริการ)
            <ArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

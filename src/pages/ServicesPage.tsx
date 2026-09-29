import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { servicePath } from '../routes';
import { Breadcrumb } from '../components/Breadcrumb';
import { ConsultBanner } from '../components/ConsultBanner';

/** หน้ารวมบริการ /services/ */
export function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-page-title" className="bg-gradient-to-b from-cream-100 to-white pb-6 pt-8 sm:pt-12">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'หน้าแรก', href: '/' }, { label: 'บริการ' }]} />
          <p className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span aria-hidden="true" className="h-px w-6 bg-sun-400" />
            Our Services
          </p>
          <h1
            id="services-page-title"
            className="mt-2 text-[1.875rem] font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-5xl"
          >
            บริการของเรา
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            ครบทุกเรื่องบัญชี ภาษี และธุรกิจของคุณ ตั้งแต่จดบริษัท ทำบัญชีรายเดือน ยื่นภาษี ปิดงบ
            ไปจนถึงงานเงินเดือน ดูแลโดยทีมที่เข้าใจ SME และร้านค้าออนไลน์
          </p>
        </div>
      </section>

      <section aria-label="รายการบริการ" className="pb-16 pt-6 sm:pb-20">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.id}>
                  <a
                    href={servicePath(service)}
                    className="group flex h-full gap-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700 sm:size-14">
                      <Icon className="size-6 sm:size-7" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <h2 className="text-lg font-bold text-brand-900 sm:text-xl">{service.title}</h2>
                      <span className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{service.description}</span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-700">
                        ดูรายละเอียด
                        <ArrowRight
                          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-14">
            <ConsultBanner
              title="ไม่แน่ใจว่าธุรกิจคุณต้องใช้บริการไหน?"
              description="เล่าให้เราฟังสั้น ๆ ทีม Easy จะแนะนำแพ็กเกจที่เหมาะกับคุณ ปรึกษาครั้งแรกฟรี"
            />
          </div>
        </div>
      </section>
    </>
  );
}

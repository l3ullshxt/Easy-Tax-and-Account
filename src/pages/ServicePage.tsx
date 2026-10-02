import { ArrowRight, Check, Info, MessageCircle, Send, Sparkles } from 'lucide-react';
import { cn } from '../lib/cn';
import { articles } from '../data/articles';
import { services } from '../data/services';
import { pricingDisclaimer } from '../data/pricing';
import { useLeadForm } from '../context/LeadFormContext';
import { ARTICLES_PATH, servicePath, SERVICES_PATH } from '../routes';
import type { Service } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/ui/Button';
import { buttonClasses } from '../components/ui/Button';

export function ServicePage({ service }: { service: Service }) {
  const { openLeadForm } = useLeadForm();
  const Icon = service.icon;
  const related = articles.filter((article) => service.relatedArticleIds.includes(article.id));
  const otherServices = services.filter((item) => item.id !== service.id).slice(0, 4);

  return (
    <>
      <section aria-labelledby="service-title" className="bg-gradient-to-b from-cream-100 to-white pb-10 pt-8 sm:pt-12">
        <div className="container-page">
          <Breadcrumb
            items={[
              { label: 'หน้าแรก', href: '/' },
              { label: 'บริการ', href: SERVICES_PATH },
              { label: service.title },
            ]}
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-12">
            <div>
              <span className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-soft">
                <Icon className="size-7" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h1
                id="service-title"
                className="mt-5 text-[1.875rem] font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl lg:text-[2.75rem]"
              >
                {service.pageTitle}
              </h1>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
                {service.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => openLeadForm({ mode: 'quote', serviceId: service.id })}>
                  <Send aria-hidden="true" />
                  ขอใบเสนอราคา
                </Button>
                <Button size="lg" variant="secondary" onClick={() => openLeadForm({ mode: 'consult' })}>
                  <MessageCircle aria-hidden="true" />
                  ปรึกษาฟรี
                </Button>
              </div>
            </div>

            {/* สิ่งที่รวมอยู่ในบริการ */}
            <div className="rounded-[1.75rem] border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-brand-900">สิ่งที่รวมอยู่ในบริการ</h2>
              <ul className="mt-5 space-y-3.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="service-forwho-title" className="bg-white py-14 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div>
            <h2 id="service-forwho-title" className="text-2xl font-bold text-brand-900 sm:text-3xl">
              เหมาะกับใคร
            </h2>
            <ul className="mt-6 space-y-3">
              {service.forWho.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-[0.7em] size-2 shrink-0 rounded-full bg-sun-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {service.process && (
            <div>
              <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">ขั้นตอนการทำงาน</h2>
              <ol className="mt-6 space-y-5">
                {service.process.map((step, index) => (
                  <li key={step.step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-[0.9375rem] font-bold text-brand-700 ring-1 ring-inset ring-brand-100"
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-bold text-brand-900">{step.step}</span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-soft">{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* แพ็กเกจราคา (ถ้าบริการนี้มี) */}
      {service.packages && service.packages.length > 0 && (
        <section aria-labelledby="service-packages-title" className="bg-cream-50 py-14 sm:py-16 lg:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 id="service-packages-title" className="text-2xl font-bold text-brand-900 sm:text-3xl lg:text-4xl">
                เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ
              </h2>
              <p className="mt-3 text-ink-soft">ราคาเหมาจ่าย รวมค่าธรรมเนียมราชการตามรายการในแพ็กเกจแล้ว</p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-md gap-6 lg:mt-14 lg:max-w-none lg:grid-cols-3 lg:gap-6">
              {service.packages.map((pkg) => (
                <li key={pkg.id} className="flex">
                  <article
                    aria-labelledby={`pkg-${pkg.id}-title`}
                    className={cn(
                      'relative flex w-full flex-col rounded-[1.75rem] p-7 transition duration-300 ease-out sm:p-8',
                      pkg.highlighted
                        ? 'bg-white shadow-lift ring-2 ring-brand-600 lg:-my-4 lg:py-11'
                        : 'border border-brand-100 bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift',
                    )}
                  >
                    {pkg.badge && (
                      <span className="absolute -top-3.5 right-6 inline-flex items-center gap-1 rounded-full bg-sun-400 px-3.5 py-1 text-sm font-bold text-brand-950 shadow-[0_6px_16px_-8px_rgb(226_176_20/0.9)]">
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        {pkg.badge}
                      </span>
                    )}

                    <h3 id={`pkg-${pkg.id}-title`} className="text-sm font-bold tracking-[0.16em] text-brand-600">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{pkg.tagline}</p>

                    <div className="mt-6 border-b border-dashed border-brand-200 pb-6">
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[2.5rem] font-bold leading-none tracking-tight text-brand-900">{pkg.price}</span>
                        <span className="text-sm font-medium text-ink-muted">{pkg.unit}</span>
                      </p>
                      {pkg.priceNote && <p className="mt-2.5 text-[0.8125rem] text-ink-muted">* {pkg.priceNote}</p>}
                    </div>

                    {pkg.featuresLabel && (
                      <p className="mt-6 text-[0.9375rem] font-semibold text-brand-800">{pkg.featuresLabel}</p>
                    )}
                    <ul className={cn('space-y-3', pkg.featuresLabel ? 'mt-3' : 'mt-6')}>
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink">
                          <span
                            aria-hidden="true"
                            className={cn(
                              'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                              pkg.highlighted ? 'bg-brand-600 text-white' : 'bg-brand-100 text-brand-700',
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
                      variant={pkg.highlighted ? 'primary' : 'secondary'}
                      className="mt-8"
                      onClick={() =>
                        openLeadForm({
                          mode: 'quote',
                          serviceId: service.id,
                          note: `สนใจแพ็กเกจ ${pkg.name} (${service.title} ${pkg.price} ${pkg.unit})`,
                        })
                      }
                      aria-label={`สนใจแพ็กเกจ ${pkg.name}`}
                    >
                      สนใจแพ็กเกจนี้
                    </Button>
                  </article>
                </li>
              ))}
            </ul>

            {service.priceNotes && (
              <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-cream-300 bg-white px-5 py-5 sm:px-7">
                <h3 className="flex items-center gap-2 font-bold text-brand-900">
                  <Info className="size-5 text-brand-600" aria-hidden="true" />
                  หมายเหตุ
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {service.priceNotes.map((note) => (
                    <li key={note} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand-300" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* จุดเด่นของบริการ */}
      {service.highlights && service.highlights.length > 0 && (
        <section aria-labelledby="service-highlights-title" className="bg-white py-14 sm:py-16">
          <div className="container-page">
            <h2 id="service-highlights-title" className="text-2xl font-bold text-brand-900 sm:text-3xl">
              ทำไมต้อง Easy Tax &amp; Account?
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {service.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-cream-50 px-5 py-4 text-[0.9375rem] leading-relaxed text-ink"
                >
                  <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ราคา + CTA */}
      <section aria-labelledby="service-price-title" className="bg-cream-50 py-14 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-cream-300 bg-white p-7 text-center shadow-soft sm:p-10">
            <h2 id="service-price-title" className="text-2xl font-bold text-brand-900 sm:text-3xl">
              {service.packages ? 'พร้อมเริ่มต้นธุรกิจของคุณหรือยัง?' : 'ค่าบริการเท่าไหร่?'}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
              {service.packages
                ? 'ให้ Easy Tax & Account ช่วยดูแลเรื่องจดทะเบียน บัญชี และภาษี ตั้งแต่วันแรก ปรึกษาก่อนตัดสินใจได้ฟรี'
                : pricingDisclaimer}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => openLeadForm({ mode: 'quote', serviceId: service.id })}>
                <Send aria-hidden="true" />
                ขอใบเสนอราคาบริการนี้
              </Button>
              <a href="/#pricing" className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
                ดูแพ็กเกจราคา
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="service-articles-title" className="bg-white py-14 sm:py-16">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="service-articles-title" className="text-2xl font-bold text-brand-900 sm:text-3xl">
                บทความที่เกี่ยวข้อง
              </h2>
              <a href={ARTICLES_PATH} className="rounded font-semibold text-brand-700 hover:text-brand-900 hover:underline">
                ดูบทความทั้งหมด →
              </a>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
              {related.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="other-services-title" className="bg-cream-50 py-14 sm:py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="other-services-title" className="text-2xl font-bold text-brand-900 sm:text-3xl">
              บริการอื่นของเรา
            </h2>
            <a href={SERVICES_PATH} className="rounded font-semibold text-brand-700 hover:text-brand-900 hover:underline">
              ดูบริการทั้งหมด →
            </a>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {otherServices.map((item) => {
              const ItemIcon = item.icon;
              return (
                <li key={item.id}>
                  <a
                    href={servicePath(item)}
                    className="group flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                  >
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                      <ItemIcon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="mt-4 font-bold text-brand-900">{item.title}</span>
                    <span className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.description}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-700">
                      ดูรายละเอียด
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

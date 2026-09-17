import { Check, MessageCircle, Send } from 'lucide-react';
import { heroContent } from '../data/hero';
import { siteConfig } from '../config/site';
import { useLeadForm } from '../context/LeadFormContext';
import { Button } from '../components/ui/Button';

function HeroChecklist({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="sr-only">สิ่งที่ทีม Easy ดูแลให้</p>
      <ul className="space-y-2.5">
        {heroContent.checklist.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-brand-900">
            <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-brand-50/70 to-white"
    >
      {/* Soft background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute -left-32 top-1/2 size-[22rem] rounded-full bg-sun-100/50 blur-3xl" />
        <svg className="absolute inset-0 size-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#c2e3cd" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      <div className="container-page relative grid items-center gap-10 pb-14 pt-10 sm:pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-brand-800 shadow-sm backdrop-blur sm:text-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
            </span>
            {heroContent.badge}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] font-bold leading-[1.2] tracking-tight text-brand-900 min-[400px]:text-[2.75rem] sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
          >
            บัญชีไม่ยาก
            <br />
            ถ้ามี{' '}
            <span className="relative inline-block px-1 font-script text-[1.18em] leading-none text-brand-600">
              Easy
              <svg
                aria-hidden="true"
                viewBox="0 0 120 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full text-sun-400"
              >
                <path d="M3 9c26-6 60-8 114-3" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            อยู่ข้าง ๆ
          </h1>

          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-ink-soft sm:text-lg">{heroContent.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => openLeadForm({ mode: 'quote' })}>
              <Send aria-hidden="true" />
              ขอใบเสนอราคา
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => openLeadForm({ mode: 'consult' })}
            >
              <MessageCircle aria-hidden="true" />
              ปรึกษาฟรี
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
            {heroContent.trustPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand-500" strokeWidth={2.5} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration — เปลี่ยนรูปได้ที่ siteConfig.images.heroCharacters */}
        <div className="relative mx-auto w-full max-w-[36rem] animate-fade-up [animation-delay:120ms] lg:max-w-none">
          <p
            aria-hidden="true"
            className="absolute left-[34%] top-[-1%] z-10 hidden -rotate-6 font-hand text-sm leading-snug text-brand-700 sm:block"
          >
            พี่ Easy
            <br />
            &amp; น้อง Bee
            <svg viewBox="0 0 60 30" className="absolute -right-12 top-3 h-6 w-12 text-brand-500" fill="none">
              <path d="M2 6c18-4 36 2 48 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="m42 20 9 3 1-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>

          <img
            src={siteConfig.images.heroCharacters}
            alt="พี่ Easy ผู้หญิงผมยาวสวมเบลเซอร์สีเขียว และน้อง Bee ผู้ชายสวมฮู้ดดี้สีเขียว กำลังนั่งทำบัญชีด้วยกันอย่างยิ้มแย้ม"
            width={700}
            height={520}
            fetchPriority="high"
            className="relative w-full animate-float drop-shadow-[0_24px_30px_rgb(16_64_42/0.1)]"
          />

          {/* Floating checklist (tablet/desktop) */}
          <HeroChecklist className="absolute right-0 top-[8%] hidden animate-float rounded-2xl border border-brand-100 bg-white/95 p-4 pr-5 shadow-lift backdrop-blur [animation-delay:-3.5s] sm:block lg:-right-2 xl:-right-6" />

          {/* Checklist (mobile) */}
          <HeroChecklist className="relative -mt-6 mx-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-lift sm:hidden" />
        </div>
      </div>
    </section>
  );
}

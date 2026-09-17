import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLeadForm } from '../context/LeadFormContext';
import { Button, ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { LineIcon } from '../components/ui/SocialIcons';

export function CTA() {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="contact" aria-labelledby="cta-title" className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="container-page">
        <Reveal>
          <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-brand-800 px-6 pt-10 text-center sm:px-10 lg:rounded-[2.5rem] lg:px-14 lg:pt-0 lg:text-left">
            {/* Decorative */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-700/60" />
              <div className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-brand-900/50" />
              <svg className="absolute bottom-6 right-10 hidden h-16 w-28 text-sun-300/70 lg:block" viewBox="0 0 110 60" fill="none">
                <path d="m6 30 44-22-12 44-8-16-24-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M30 36c20 10 40 14 74 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
              </svg>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,17rem)_1fr_auto] lg:gap-10">
              <div className="order-2 mx-auto w-full max-w-[17rem] lg:order-none lg:self-end lg:pt-8">
                {/* เปลี่ยนรูปได้ที่ siteConfig.images.ctaCharacters */}
                <img
                  src={siteConfig.images.ctaCharacters}
                  alt="พี่ Easy และน้อง Bee ยิ้มพร้อมให้คำปรึกษา"
                  width={466}
                  height={362}
                  loading="lazy"
                  className="w-full"
                />
              </div>

              <div className="lg:py-12">
                <h2 id="cta-title" className="text-[1.625rem] font-bold leading-snug text-white sm:text-3xl lg:text-[2.125rem]">
                  <span className="inline-block">ให้เรื่องบัญชีเป็นเรื่องง่าย</span>{' '}
                  <span className="inline-block">แล้วไปโฟกัสกับธุรกิจของคุณกัน</span>
                </h2>
                <p className="mt-3 text-base text-brand-100 sm:text-lg">ปรึกษาสำนักงานบัญชี Easy Tax &amp; Account ได้เลย</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:min-w-[13rem] lg:flex-col">
                <Button variant="sun" size="lg" onClick={() => openLeadForm({ mode: 'consult' })}>
                  <MessageCircle aria-hidden="true" />
                  ปรึกษาฟรี
                </Button>
                <ButtonLink href={siteConfig.contact.lineUrl} external variant="light" size="lg">
                  <LineIcon className="text-line" />
                  แอด LINE
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

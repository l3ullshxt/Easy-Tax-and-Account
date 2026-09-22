import { ArrowLeft, BookOpen } from 'lucide-react';
import { ARTICLES_PATH } from '../routes';
import { buttonClasses } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title" className="bg-gradient-to-b from-cream-100 to-white py-24 sm:py-32">
      <div className="container-page max-w-xl text-center">
        <p className="font-script text-6xl font-bold text-brand-600">404</p>
        <h1 id="not-found-title" className="mt-4 text-3xl font-bold text-brand-900 sm:text-4xl">
          ไม่พบหน้าที่คุณค้นหา
        </h1>
        <p className="mt-4 text-lg text-ink-soft">หน้านี้อาจถูกย้ายหรือลบไปแล้ว ลองกลับไปที่หน้าแรกหรือดูบทความของเรา</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/" className={buttonClasses({ size: 'lg' })}>
            <ArrowLeft aria-hidden="true" />
            กลับหน้าแรก
          </a>
          <a href={ARTICLES_PATH} className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
            <BookOpen aria-hidden="true" />
            ดูบทความ
          </a>
        </div>
      </div>
    </section>
  );
}

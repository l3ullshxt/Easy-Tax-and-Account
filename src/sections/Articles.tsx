import { useState } from 'react';
import { ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { articleDisclaimer, articles } from '../data/articles';
import type { Article } from '../types';
import { useLeadForm } from '../context/LeadFormContext';
import { ArticleCard } from '../components/ArticleCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

export function Articles() {
  const [showAll, setShowAll] = useState(false);
  const [reading, setReading] = useState<Article | null>(null);
  const { openLeadForm } = useLeadForm();

  const visibleArticles = showAll ? articles : articles.filter((article) => article.featured);
  const hasMore = articles.some((article) => !article.featured);

  const toggleButton = (className: string) =>
    hasMore && (
      <Button
        variant="secondary"
        size="md"
        className={className}
        aria-expanded={showAll}
        aria-controls="articles-grid"
        onClick={() => setShowAll((value) => !value)}
      >
        {showAll ? 'แสดงน้อยลง' : 'ดูบทความทั้งหมด'}
        <ArrowRight
          aria-hidden="true"
          className={showAll ? '-rotate-90 transition-transform duration-200' : 'transition-transform duration-200 group-hover/btn:translate-x-1'}
        />
      </Button>
    );

  return (
    <section id="articles" aria-labelledby="articles-title" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="articles-title"
            eyebrow="Knowledge"
            title="เรื่องบัญชีที่เจ้าของธุรกิจควรรู้"
            subtitle="บทความที่ช่วยให้คุณเข้าใจเรื่องบัญชี ภาษี และธุรกิจได้ง่ายขึ้น"
          />
          <div className="hidden shrink-0 md:block">{toggleButton('')}</div>
        </Reveal>

        <ul id="articles-grid" className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-14 lg:gap-6">
          {visibleArticles.map((article, index) => (
            <li key={article.id}>
              <Reveal delay={article.featured ? index * 80 : 0} className="h-full">
                <ArticleCard article={article} onRead={setReading} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 md:hidden">{toggleButton('w-full')}</div>
      </div>

      <Modal open={reading !== null} onClose={() => setReading(null)} labelledBy="article-dialog-title">
        {reading && (
          <article>
            <img
              src={reading.image}
              alt={reading.imageAlt}
              width={400}
              height={250}
              className="aspect-[16/8] w-full rounded-t-[1.75rem] object-cover"
            />
            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
                  {reading.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink-muted">
                  <Clock className="size-4" aria-hidden="true" />
                  อ่าน {reading.readingMinutes} นาที
                </span>
              </div>
              <h2 id="article-dialog-title" className="mt-3 text-2xl font-bold text-brand-900 sm:text-3xl">
                {reading.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
                {reading.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-cream-100 px-4 py-3 text-sm text-ink-muted">{articleDisclaimer}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    setReading(null);
                    openLeadForm({ mode: 'consult' });
                  }}
                >
                  <MessageCircle aria-hidden="true" />
                  ปรึกษาเรื่องนี้กับทีม Easy
                </Button>
                <Button size="lg" variant="secondary" onClick={() => setReading(null)}>
                  กลับไปหน้าบทความ
                </Button>
              </div>
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}

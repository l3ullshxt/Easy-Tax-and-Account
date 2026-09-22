import { CalendarDays, Clock } from 'lucide-react';
import { articleDisclaimer, articles } from '../data/articles';
import { ARTICLES_PATH } from '../routes';
import type { Article, ArticleBlock } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { ConsultBanner } from '../components/ConsultBanner';

const thaiDate = new Intl.DateTimeFormat('th-TH', { dateStyle: 'long', timeZone: 'Asia/Bangkok' });

function formatDate(isoDate: string) {
  return thaiDate.format(new Date(`${isoDate}T00:00:00+07:00`));
}

function Block({ block }: { block: ArticleBlock }) {
  if (typeof block === 'string') return <p>{block}</p>;
  if ('heading' in block) {
    return <h2 className="pt-5 text-xl font-bold text-brand-900 sm:text-2xl">{block.heading}</h2>;
  }
  return (
    <ul className="space-y-2.5 pl-1">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] size-2 shrink-0 rounded-full bg-brand-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ArticlePage({ article }: { article: Article }) {
  const related = articles.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-gradient-to-b from-cream-100 to-white pb-8 pt-8 sm:pt-12">
          <div className="container-page max-w-3xl">
            <Breadcrumb
              items={[
                { label: 'หน้าแรก', href: '/' },
                { label: 'บทความ', href: ARTICLES_PATH },
                { label: article.title },
              ]}
            />
            <p className="mt-6 inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
              {article.category}
            </p>
            <h1 className="mt-4 text-[1.875rem] font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl lg:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{article.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                อ่าน {article.readingMinutes} นาที
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden="true" />
                อัปเดต <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            </div>
          </div>
        </header>

        <div className="container-page max-w-3xl pb-14">
          <img
            src={article.image}
            alt={article.imageAlt}
            width={400}
            height={250}
            className="aspect-[16/9] w-full rounded-[1.75rem] bg-cream-100 object-cover shadow-soft"
          />

          <div className="mt-10 space-y-5 text-[1.0625rem] leading-[1.9] text-ink">
            {article.content.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          <p className="mt-10 rounded-2xl border border-cream-300 bg-cream-100 px-5 py-4 text-sm leading-relaxed text-ink-muted">
            {articleDisclaimer}
          </p>

          <div className="mt-10">
            <ConsultBanner />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-cream-50 py-14 sm:py-16">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="text-2xl font-bold text-brand-900 sm:text-3xl">
                บทความอื่นที่น่าสนใจ
              </h2>
              <a href={ARTICLES_PATH} className="rounded font-semibold text-brand-700 hover:text-brand-900 hover:underline">
                ดูบทความทั้งหมด →
              </a>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
              {related.map((item) => (
                <li key={item.id}>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

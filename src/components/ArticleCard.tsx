import { ArrowRight, Clock } from 'lucide-react';
import { articlePath } from '../routes';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  /** ระดับหัวข้อของชื่อบทความ (h3 ในหน้าแรก, h2 ในหน้ารวมบทความ) */
  headingLevel?: 'h2' | 'h3';
}

export function ArticleCard({ article, headingLevel = 'h3' }: ArticleCardProps) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full gap-4 rounded-3xl border border-brand-100 bg-white p-3 shadow-soft transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift md:flex-col md:gap-0 md:overflow-hidden md:p-0">
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl bg-cream-100 sm:w-36 md:aspect-[16/10] md:w-full md:rounded-none">
        <img
          src={article.image}
          alt={article.imageAlt}
          width={400}
          height={250}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1 md:p-6">
        <p className="self-start rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
          {article.category}
        </p>
        <Heading className="mt-2.5 text-base font-bold leading-snug text-brand-900 sm:text-lg">
          {/* ลิงก์คลุมทั้งการ์ด (after:inset-0) */}
          <a
            href={articlePath(article)}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-500"
          >
            {article.title}
          </a>
        </Heading>
        <p className="mt-2 hidden text-[0.9375rem] leading-relaxed text-ink-soft md:line-clamp-2">{article.excerpt}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-sm md:pt-5">
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <Clock className="size-4" aria-hidden="true" />
            อ่าน {article.readingMinutes} นาที
          </span>
          <span aria-hidden="true" className="inline-flex items-center gap-1 font-semibold text-brand-700 transition-colors duration-200 group-hover:text-brand-900">
            อ่านต่อ
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

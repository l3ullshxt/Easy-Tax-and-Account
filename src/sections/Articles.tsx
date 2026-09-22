import { ArrowRight } from 'lucide-react';
import { articles } from '../data/articles';
import { ARTICLES_PATH } from '../routes';
import { ArticleCard } from '../components/ArticleCard';
import { buttonClasses } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

const featuredArticles = articles.filter((article) => article.featured);

function AllArticlesLink({ className }: { className?: string }) {
  return (
    <a href={ARTICLES_PATH} className={buttonClasses({ variant: 'secondary', size: 'md' }, className)}>
      ดูบทความทั้งหมด
      <ArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-x-1" />
    </a>
  );
}

export function Articles() {
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
          <div className="hidden shrink-0 md:block">
            <AllArticlesLink />
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5 lg:mt-14 lg:gap-6">
          {featuredArticles.map((article, index) => (
            <li key={article.id}>
              <Reveal delay={index * 80} className="h-full">
                <ArticleCard article={article} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-8 md:hidden">
          <AllArticlesLink className="w-full" />
        </div>
      </div>
    </section>
  );
}

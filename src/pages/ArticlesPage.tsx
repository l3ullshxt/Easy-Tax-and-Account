import { articles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { ConsultBanner } from '../components/ConsultBanner';

/** หน้ารวมบทความ /articles/ */
export function ArticlesPage() {
  return (
    <>
      <section aria-labelledby="articles-page-title" className="bg-gradient-to-b from-cream-100 to-white pb-6 pt-8 sm:pt-12">
        <div className="container-page">
          <Breadcrumb items={[{ label: 'หน้าแรก', href: '/' }, { label: 'บทความ' }]} />
          <p className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
            <span aria-hidden="true" className="h-px w-6 bg-sun-400" />
            Knowledge
          </p>
          <h1 id="articles-page-title" className="mt-2 text-[1.875rem] font-bold tracking-tight text-brand-900 sm:text-4xl lg:text-5xl">
            เรื่องบัญชีที่เจ้าของธุรกิจควรรู้
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            รวมบทความเรื่องบัญชี ภาษี และการเริ่มธุรกิจ อธิบายแบบเข้าใจง่ายสำหรับ SME และร้านค้าออนไลน์
          </p>
        </div>
      </section>

      <section aria-label="รายการบทความ" className="pb-16 pt-6 sm:pb-20">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleCard article={article} headingLevel="h2" />
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <ConsultBanner title="ไม่เจอเรื่องที่อยากรู้?" description="ถามทีม Easy ได้โดยตรง ปรึกษาครั้งแรกฟรี" />
          </div>
        </div>
      </section>
    </>
  );
}

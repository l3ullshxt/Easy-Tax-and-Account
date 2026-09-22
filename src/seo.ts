import { siteConfig } from './config/site';
import { ARTICLES_PATH, articlePath, getAllPaths, resolveRoute, type Route } from './routes';

/**
 * Title / description / structured data ของแต่ละหน้า
 * ------------------------------------------------------------
 * ตอน build: scripts/prerender.mjs ใช้ข้อมูลนี้เขียน <head> ของแต่ละหน้าเป็น HTML จริง
 * (Google และการแชร์ลิงก์ใน LINE / Facebook จะเห็น title + description ของหน้านั้นทันที)
 */
export interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogType: 'website' | 'article';
  image: string;
  imageAlt: string;
  keywords?: string;
  noindex?: boolean;
  jsonLd: object[];
}

const HOME_TITLE = `${siteConfig.name} | สำนักงานบัญชี SME และธุรกิจออนไลน์ ${siteConfig.location}`;
const HOME_DESCRIPTION = `Easy Tax & Account สำนักงานบัญชีย่าน${siteConfig.location} สำหรับ SME และธุรกิจออนไลน์ รับทำบัญชีรายเดือน ยื่นภาษี ปิดงบ จดบริษัท และให้คำปรึกษาด้านบัญชี ดูแลลูกค้าออนไลน์ได้ทั่วประเทศ`;
const HOME_KEYWORDS = [
  'สำนักงานบัญชี',
  'รับทำบัญชี',
  'รับทำบัญชีรายเดือน',
  'สำนักงานบัญชี SME',
  'รับทำบัญชีออนไลน์',
  'ยื่นภาษี',
  'ปิดงบ',
  'จดบริษัท',
  'บัญชี TikTok Shop',
  'บัญชี E-Commerce',
  'สำนักงานบัญชี บางกอกน้อย',
  'รับทำบัญชี บางกอกน้อย',
  'สำนักงานบัญชี ฝั่งธนบุรี',
  'สำนักงานบัญชี กรุงเทพ',
].join(', ');

const DEFAULT_IMAGE = '/images/og-image.png';
const DEFAULT_IMAGE_ALT = `${siteConfig.name} — ${siteConfig.tagline}`;

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getPageMeta(route: Route): PageMeta {
  switch (route.kind) {
    case 'home':
      return {
        title: HOME_TITLE,
        description: HOME_DESCRIPTION,
        path: '/',
        ogType: 'website',
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        keywords: HOME_KEYWORDS,
        jsonLd: [],
      };

    case 'articles':
      return {
        title: `บทความบัญชีและภาษีสำหรับเจ้าของธุรกิจ | ${siteConfig.name}`,
        description:
          'รวมบทความเรื่องบัญชี ภาษี VAT ภาษีหัก ณ ที่จ่าย และการจดบริษัท อธิบายแบบเข้าใจง่ายสำหรับ SME และร้านค้าออนไลน์ โดยทีม Easy Tax & Account',
        path: ARTICLES_PATH,
        ogType: 'website',
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        jsonLd: [
          breadcrumb([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บทความ', path: ARTICLES_PATH },
          ]),
        ],
      };

    case 'article': {
      const { article } = route;
      const path = articlePath(article);
      return {
        title: `${article.title} | ${siteConfig.name}`,
        description: article.excerpt,
        path,
        ogType: 'article',
        // รูปบทความเป็น SVG ซึ่ง Facebook / LINE ไม่รองรับ จึงใช้รูปแชร์หลักของเว็บ
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: [absoluteUrl(article.image), absoluteUrl(DEFAULT_IMAGE)],
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            inLanguage: 'th',
            articleSection: article.category,
            mainEntityOfPage: absoluteUrl(path),
            author: { '@type': 'Organization', name: siteConfig.name, url: absoluteUrl('/') },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.name,
              logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon-512.png') },
            },
          },
          breadcrumb([
            { name: 'หน้าแรก', path: '/' },
            { name: 'บทความ', path: ARTICLES_PATH },
            { name: article.title, path },
          ]),
        ],
      };
    }

    case 'notFound':
      return {
        title: `ไม่พบหน้าที่ค้นหา | ${siteConfig.name}`,
        description: HOME_DESCRIPTION,
        path: '/404',
        ogType: 'website',
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        noindex: true,
        jsonLd: [],
      };
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** สร้างแท็ก SEO ใน <head> (แทนที่ส่วนระหว่าง <!--seo:start--> และ <!--seo:end--> ใน index.html) */
export function renderHead(meta: PageMeta) {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image);
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : '',
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:locale" content="th_TH" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...meta.jsonLd.map(
      (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}

/** sitemap.xml ของทุกหน้า (สร้างตอน build) */
export function renderSitemap(buildDate: string) {
  const urls = getAllPaths().map((path) => {
    const route = resolveRoute(path);
    const lastmod = route.kind === 'article' ? route.article.updatedAt : buildDate;
    const priority = path === '/' ? '1.0' : route.kind === 'article' ? '0.7' : '0.8';
    return `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

import { articles } from './data/articles';
import { services } from './data/services';
import type { Article, Service } from './types';

/**
 * หน้าเว็บทั้งหมดของเว็บไซต์
 * ------------------------------------------------------------
 * /                    หน้าแรก
 * /services/           รวมบริการ
 * /services/<id>/      หน้าบริการ (สร้างจาก src/data/services.ts)
 * /articles/           รวมบทความ
 * /articles/<id>/      หน้าบทความ (สร้างจาก src/data/articles.ts)
 * /privacy/            นโยบายความเป็นส่วนตัว
 */
export type Route =
  | { kind: 'home' }
  | { kind: 'articles' }
  | { kind: 'article'; article: Article }
  | { kind: 'services' }
  | { kind: 'service'; service: Service }
  | { kind: 'privacy' }
  | { kind: 'notFound' };

export const ARTICLES_PATH = '/articles/';
export const SERVICES_PATH = '/services/';
export const PRIVACY_PATH = '/privacy/';

export function articlePath(article: Article) {
  return `${ARTICLES_PATH}${article.id}/`;
}

export function servicePath(service: Service) {
  return `${SERVICES_PATH}${service.id}/`;
}

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home' };
  if (path === '/articles') return { kind: 'articles' };
  if (path === '/services') return { kind: 'services' };
  if (path === '/privacy') return { kind: 'privacy' };

  const articleMatch = path.match(/^\/articles\/([a-z0-9-]+)$/);
  const article = articleMatch && articles.find((item) => item.id === articleMatch[1]);
  if (article) return { kind: 'article', article };

  const serviceMatch = path.match(/^\/services\/([a-z0-9-]+)$/);
  const service = serviceMatch && services.find((item) => item.id === serviceMatch[1]);
  if (service) return { kind: 'service', service };

  return { kind: 'notFound' };
}

/** ทุกหน้าที่ต้อง pre-render และใส่ใน sitemap */
export function getAllPaths() {
  return [
    '/',
    SERVICES_PATH,
    ...services.map(servicePath),
    ARTICLES_PATH,
    ...articles.map(articlePath),
    PRIVACY_PATH,
  ];
}

/** ลิงก์ไปยัง section ในหน้าแรก (ใช้ได้จากทุกหน้า) เช่น sectionHref('pricing') = "/#pricing" */
export function sectionHref(id: string) {
  return `/#${id}`;
}

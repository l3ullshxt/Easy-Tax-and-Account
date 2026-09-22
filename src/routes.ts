import { articles } from './data/articles';
import type { Article } from './types';

/**
 * หน้าเว็บทั้งหมดของเว็บไซต์
 * ------------------------------------------------------------
 * /                    หน้าแรก
 * /articles/           รวมบทความ
 * /articles/<id>/      หน้าบทความ (สร้างจาก src/data/articles.ts)
 */
export type Route =
  | { kind: 'home' }
  | { kind: 'articles' }
  | { kind: 'article'; article: Article }
  | { kind: 'notFound' };

export const ARTICLES_PATH = '/articles/';

export function articlePath(article: Article) {
  return `${ARTICLES_PATH}${article.id}/`;
}

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home' };
  if (path === '/articles') return { kind: 'articles' };

  const match = path.match(/^\/articles\/([a-z0-9-]+)$/);
  const article = match && articles.find((item) => item.id === match[1]);
  if (article) return { kind: 'article', article };

  return { kind: 'notFound' };
}

/** ทุกหน้าที่ต้อง pre-render และใส่ใน sitemap */
export function getAllPaths() {
  return ['/', ARTICLES_PATH, ...articles.map(articlePath)];
}

/** ลิงก์ไปยัง section ในหน้าแรก (ใช้ได้จากทุกหน้า) เช่น sectionHref('pricing') = "/#pricing" */
export function sectionHref(id: string) {
  return `/#${id}`;
}

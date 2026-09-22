/**
 * ใช้ตอน build เท่านั้น (ดู scripts/prerender.mjs)
 * render แต่ละหน้าเป็น HTML ล่วงหน้า เพื่อให้ Google เห็นเนื้อหาครบโดยไม่ต้องรัน JavaScript
 */
import { renderToString } from 'react-dom/server';
import App from './App';
import { resolveRoute } from './routes';

export { getAllPaths, resolveRoute } from './routes';
export { getPageMeta, renderHead, renderSitemap } from './seo';

export function render(pathname: string) {
  return renderToString(<App route={resolveRoute(pathname)} />);
}

/**
 * Pre-render ทุกหน้าเป็นไฟล์ HTML (รันอัตโนมัติใน `npm run build`)
 * ------------------------------------------------------------
 * 1. `vite build`                → dist/ (ไฟล์ JS/CSS + index.html ต้นแบบ)
 * 2. `vite build --ssr ...`      → dist-ssr/entry-server.js
 * 3. สคริปต์นี้                   → dist/index.html, dist/articles/.../index.html, dist/404.html, dist/sitemap.xml
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const entry = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');

const SEO_START = '<!--seo:start-->';
const SEO_END = '<!--seo:end-->';
const ROOT_TAG = '<div id="root"></div>';

if (!template.includes(SEO_START) || !template.includes(SEO_END) || !template.includes(ROOT_TAG)) {
  throw new Error('index.html ต้องมี <!--seo:start-->, <!--seo:end--> และ <div id="root"></div>');
}

function renderPage(pathname) {
  const meta = entry.getPageMeta(entry.resolveRoute(pathname));
  const head = entry.renderHead(meta);
  const body = entry.render(pathname);
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END) + SEO_END.length;
  return (template.slice(0, start) + head + template.slice(end)).replace(ROOT_TAG, `<div id="root">${body}</div>`);
}

async function write(relativePath, content) {
  const file = path.join(distDir, relativePath);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content, 'utf8');
  console.log(`  prerendered  ${relativePath}`);
}

for (const pathname of entry.getAllPaths()) {
  const out = pathname === '/' ? 'index.html' : path.join(pathname, 'index.html');
  await write(out, renderPage(pathname));
}
await write('404.html', renderPage('/404'));

const buildDate = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' });
await write('sitemap.xml', entry.renderSitemap(buildDate));

await fs.rm(ssrDir, { recursive: true, force: true });

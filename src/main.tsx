import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { resolveRoute } from './routes';
import { getPageMeta } from './seo';
import './styles/index.css';

const container = document.getElementById('root')!;
const route = resolveRoute(window.location.pathname);
const app = (
  <StrictMode>
    <App route={route} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  // หน้าที่ถูก pre-render ไว้ตอน build (production) — เชื่อม React เข้ากับ HTML เดิม
  hydrateRoot(container, app);
} else {
  // ตอนพัฒนา (npm run dev) ยังไม่มี HTML ที่ pre-render — render ใหม่ทั้งหมด
  createRoot(container).render(app);
  document.title = getPageMeta(route).title;
}

// เปิดลิงก์แบบ /#pricing จากหน้าอื่น — เลื่อนไปที่ section นั้นทันทีหลังหน้าโหลด
if (window.location.hash) {
  setTimeout(() => {
    document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
  }, 0);
}

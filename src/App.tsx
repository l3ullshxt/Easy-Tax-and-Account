import { lazy, Suspense, useEffect, useState } from 'react';
import { LeadFormProvider, useLeadForm } from './context/LeadFormContext';
import { FloatingLineButton } from './components/FloatingLineButton';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ServicePage } from './pages/ServicePage';
import { ServicesPage } from './pages/ServicesPage';
import type { Route } from './routes';

// ฟอร์มขอใบเสนอราคาโหลดเฉพาะตอนเปิดใช้งาน เพื่อให้หน้าเว็บโหลดครั้งแรกเบาลง
const LeadFormModal = lazy(() => import('./components/LeadFormModal').then((m) => ({ default: m.LeadFormModal })));

function LeadFormSlot() {
  const { isOpen } = useLeadForm();
  // โหลดครั้งแรกที่เปิดฟอร์ม แล้วคงไว้ (เพื่อให้การปิด/คืนโฟกัสทำงานตามปกติ)
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (isOpen) setLoaded(true);
  }, [isOpen]);

  if (!loaded) return null;
  return (
    <Suspense fallback={null}>
      <LeadFormModal />
    </Suspense>
  );
}

function Page({ route }: { route: Route }) {
  switch (route.kind) {
    case 'home':
      return <HomePage />;
    case 'articles':
      return <ArticlesPage />;
    case 'article':
      return <ArticlePage article={route.article} />;
    case 'services':
      return <ServicesPage />;
    case 'service':
      return <ServicePage service={route.service} />;
    case 'privacy':
      return <PrivacyPage />;
    case 'notFound':
      return <NotFoundPage />;
  }
}

export default function App({ route }: { route: Route }) {
  return (
    <LeadFormProvider>
      <a href="#main" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <Navbar route={route} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Page route={route} />
      </main>
      <Footer />
      <FloatingLineButton />
      <LeadFormSlot />
    </LeadFormProvider>
  );
}

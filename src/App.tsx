import { LeadFormProvider } from './context/LeadFormContext';
import { FloatingLineButton } from './components/FloatingLineButton';
import { Footer } from './components/Footer';
import { LeadFormModal } from './components/LeadFormModal';
import { Navbar } from './components/Navbar';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import type { Route } from './routes';

function Page({ route }: { route: Route }) {
  switch (route.kind) {
    case 'home':
      return <HomePage />;
    case 'articles':
      return <ArticlesPage />;
    case 'article':
      return <ArticlePage article={route.article} />;
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
      <LeadFormModal />
    </LeadFormProvider>
  );
}

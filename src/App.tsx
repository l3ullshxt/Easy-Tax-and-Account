import { LeadFormProvider } from './context/LeadFormContext';
import { FloatingLineButton } from './components/FloatingLineButton';
import { Footer } from './components/Footer';
import { LeadFormModal } from './components/LeadFormModal';
import { Navbar } from './components/Navbar';
import { Articles } from './sections/Articles';
import { BusinessStages } from './sections/BusinessStages';
import { CTA } from './sections/CTA';
import { Hero } from './sections/Hero';
import { Pricing } from './sections/Pricing';
import { Services } from './sections/Services';
import { WhyEasy } from './sections/WhyEasy';

export default function App() {
  return (
    <LeadFormProvider>
      <a href="#main" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <BusinessStages />
        <Services />
        <Pricing />
        <WhyEasy />
        <Articles />
        <CTA />
      </main>
      <Footer />
      <FloatingLineButton />
      <LeadFormModal />
    </LeadFormProvider>
  );
}

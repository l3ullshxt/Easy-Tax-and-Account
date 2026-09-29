import { Articles } from '../sections/Articles';
import { Faq } from '../sections/Faq';
import { BusinessStages } from '../sections/BusinessStages';
import { CTA } from '../sections/CTA';
import { Hero } from '../sections/Hero';
import { Pricing } from '../sections/Pricing';
import { Services } from '../sections/Services';
import { WhyEasy } from '../sections/WhyEasy';

export function HomePage() {
  return (
    <>
      <Hero />
      <BusinessStages />
      <Services />
      <Pricing />
      <WhyEasy />
      <Articles />
      <Faq />
      <CTA />
    </>
  );
}

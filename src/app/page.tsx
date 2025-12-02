import HeroSection from '@/components/home/HeroSection';
import SubjectsSection from '@/components/home/SubjectsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import DemoSection from '@/components/home/DemoSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import FinalCTASection from '@/components/home/FinalCTASection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <SubjectsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <DemoSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}


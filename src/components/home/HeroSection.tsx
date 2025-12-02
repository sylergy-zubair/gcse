'use client';

import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative bg-primary-500 h-[800px] w-full overflow-hidden">
      <Header />
      
      {/* Hero Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        <div className="text-center">
          <h1 className="font-serif text-[48px] text-white mb-4">
            Empower Your GCSE Learning with
          </h1>
          <h2 className="font-serif text-[48px] text-white mb-8">
            <span className="font-black">Our RAG-Powered</span> AI System
          </h2>
          <p className="font-sans text-lg text-white mb-12 max-w-[1007px] mx-auto leading-relaxed">
            Our <span className="font-extrabold">RAG-based</span> system is trained on verified GCSE papers to ensure every answer, hint, and report reflects real exam standards.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center">
            <Button variant="accent" href="/signup">
              Try It Free
            </Button>
            <Button variant="secondary" href="/#demo-video">
              Demo Video
            </Button>
          </div>
        </div>
      </div>

      {/* Student Images - Placeholder for masked images */}
      <div className="absolute hidden bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1102px] h-[520px] justify-center items-end gap-4">
        {/* These would be replaced with actual masked images from Figma */}
        <div className="w-[355px] h-[520px] bg-neutral-200/30 rounded-lg"></div>
        <div className="w-[291px] h-[443px] bg-neutral-200/30 rounded-lg"></div>
        <div className="w-[352px] h-[497px] bg-neutral-200/30 rounded-lg"></div>
      </div>
    </section>
  );
}


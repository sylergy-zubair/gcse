'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-100 py-[63px]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        <div className="flex justify-between items-start">
          {/* Branding */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif font-bold text-[48px] text-black">GCSE</h2>
            <p className="font-sans text-xl text-black">We make your learning smooth</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-8">
            <Link href="/#how-it-works" className="font-sans text-xl text-black hover:text-primary-700 transition-colors">
              How It Works
            </Link>
            <Link href="/#subjects" className="font-sans text-xl text-black hover:text-primary-700 transition-colors">
              Subjects
            </Link>
            <Link href="/#features" className="font-sans text-xl text-black hover:text-primary-700 transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="font-sans text-xl text-black hover:text-primary-700 transition-colors">
              Pricing
            </Link>
          </div>

          {/* Contact */}
          <div>
            <Link href="/contact" className="font-sans text-xl text-black hover:text-primary-700 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


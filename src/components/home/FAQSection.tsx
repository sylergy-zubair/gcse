'use client';

import { useState } from 'react';
import { FAQ_DATA } from '@/lib/constants';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
            Everything you need to know about the product
          </h2>
          <div className="w-[682px] h-[16px] bg-black mx-auto"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div
              key={faq.id}
              className="border-b border-neutral-200 pb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-5">
                  <span className="text-black text-xl">•</span>
                  <p className="font-sans text-2xl text-black">
                    {faq.question}
                  </p>
                </div>
                <span className="text-black text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 pl-8">
                  <p className="font-sans text-lg text-gray-600">
                    {/* Answer would go here - you can add answers to the FAQ_DATA */}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


'use client';

import { getAllSubscriptionPlans } from '@/lib/api/subscriptions';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features?: string[];
  description?: string;
}

const DEFAULT_PLANS = [
  { id: '1', name: 'Plan-01', price: 0, duration: 'month' },
  { id: '2', name: 'Plan-02', price: 0, duration: 'month' },
  { id: '3', name: 'Plan-03', price: 0, duration: 'month' },
];

export default function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);

  useEffect(() => {
    getAllSubscriptionPlans()
      .then(setPlans)
      .catch(() => {
        setPlans(DEFAULT_PLANS);
      });
  }, []);

  return (
    <section id="pricing" className="bg-neutral-200 py-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
            Plans That will work for you
          </h2>
          <div className="w-[447px] h-[16px] bg-black mx-auto"></div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-3 gap-8">
          {plans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg p-8 h-[522px] flex flex-col justify-center items-center hover:shadow-xl transition-shadow"
            >
              <h3 className="font-sans font-semibold text-2xl text-black mb-4">
                {plan.name}
              </h3>
              {plan.price > 0 ? (
                <div className="text-center mb-6">
                  <span className="font-serif text-4xl font-bold">
                    £{plan.price}
                  </span>
                  <span className="text-xl">/{plan.duration}</span>
                </div>
              ) : (
                <p className="text-center mb-6 text-xl">Coming Soon</p>
              )}
              <Button variant="primary" href="/signup" className="mt-auto">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


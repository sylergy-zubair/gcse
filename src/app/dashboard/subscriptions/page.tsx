'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '@/lib/api/auth';
import { 
  getAllSubscriptionPlans, 
  getUserSubscription,
  createSubscription 
} from '@/lib/api/subscriptions';
import type { SubscriptionPlan, Subscription } from '@/lib/api/subscriptions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function SubscriptionsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, plansData] = await Promise.all([
        getCurrentUser(),
        getAllSubscriptionPlans()
      ]);
      setUser(userData);
      setPlans(plansData);
      
      if (userData) {
        const subscription = await getUserSubscription(userData.id);
        setUserSubscription(subscription);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) return;
    try {
      await createSubscription({
        user_id: user.id,
        plan_id: planId
      });
      loadData();
      alert('Subscription created successfully!');
    } catch (error) {
      console.error('Failed to create subscription:', error);
      alert('Failed to create subscription');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-200">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">Subscriptions</h1>
            <p className="text-gray-600">Choose a subscription plan that works for you</p>
          </div>

          {userSubscription && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
              <h2 className="font-serif text-xl font-semibold mb-2">Current Subscription</h2>
              <p className="text-gray-700 mb-1">
                Status: <span className="font-semibold">{userSubscription.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Started: {new Date(userSubscription.start_date).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isSubscribed = userSubscription?.plan_id === plan.id;
              
              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg p-8 shadow hover:shadow-lg transition-shadow ${
                    isSubscribed ? 'border-2 border-green-500' : ''
                  }`}
                >
                  <h3 className="font-serif text-2xl font-semibold mb-2 text-black">
                    {plan.name}
                  </h3>
                  {plan.price > 0 ? (
                    <div className="mb-4">
                      <span className="text-3xl font-bold">£{plan.price}</span>
                      <span className="text-gray-600">/{plan.duration}</span>
                    </div>
                  ) : (
                    <p className="text-xl mb-4">Free</p>
                  )}
                  {plan.description && (
                    <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
                  )}
                  {plan.features && plan.features.length > 0 && (
                    <ul className="mb-6 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isSubscribed}
                    className="w-full"
                  >
                    {isSubscribed ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


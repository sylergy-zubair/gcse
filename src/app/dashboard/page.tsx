'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated, logout } from '@/lib/api/auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    getCurrentUser()
      .then(setUser)
      .catch(() => {
        logout();
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-neutral-200 py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <h1 className="font-serif text-4xl font-bold mb-8">
            Welcome to your Dashboard, {user?.name || user?.email}!
          </h1>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">My Submissions</h2>
              <p className="text-gray-600 mb-4">View your past exam submissions and feedback</p>
              <Button variant="primary" href="/dashboard/submissions">
                View Submissions
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">Start Exam</h2>
              <p className="text-gray-600 mb-4">Select a subject and start practicing</p>
              <Button variant="primary" href="/subjects">
                Browse Subjects
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-serif text-2xl font-semibold mb-4">My Profile</h2>
              <p className="text-gray-600 mb-4">Manage your account settings</p>
              <Button variant="primary" href="/dashboard/profile">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


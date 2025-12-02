'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

  const dashboardSections = [
    {
      title: 'Subjects',
      description: 'Browse and manage subjects',
      href: '/dashboard/subjects',
      icon: '📚',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Exam Papers',
      description: 'View and create exam papers',
      href: '/dashboard/exam-papers',
      icon: '📝',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Exam Sessions',
      description: 'Start and manage exam sessions',
      href: '/dashboard/exam-sessions',
      icon: '🎯',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Questions',
      description: 'Manage questions and answers',
      href: '/dashboard/questions',
      icon: '❓',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Submissions',
      description: 'View your exam submissions',
      href: '/dashboard/submissions',
      icon: '📤',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: 'Subscriptions',
      description: 'Manage your subscription plans',
      href: '/dashboard/subscriptions',
      icon: '💳',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: 'Marking Feedback',
      description: 'View AI marking feedback',
      href: '/dashboard/feedback',
      icon: '✨',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      title: 'Answer Hints',
      description: 'View and manage answer hints',
      href: '/dashboard/hints',
      icon: '💡',
      color: 'bg-teal-50 border-teal-200'
    },
    {
      title: 'Profile & Settings',
      description: 'Manage your account',
      href: '/dashboard/profile',
      icon: '👤',
      color: 'bg-gray-50 border-gray-200'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-200">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2 text-black">
              Welcome back, {user?.name || user?.email}!
            </h1>
            <p className="text-gray-600">Manage your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`${section.color} border-2 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{section.icon}</div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl font-semibold mb-2 text-black">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Go to {section.title} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


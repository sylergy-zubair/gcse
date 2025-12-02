'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/api/auth';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className={`${isHomePage ? 'absolute' : 'relative'} top-0 left-0 w-full z-50`}>
      <nav className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px] py-[30px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-primary-500 font-serif font-bold text-2xl">
            GCSE
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link 
              href="/#how-it-works" 
              className="text-white font-serif text-xl hover:text-primary-100 transition-colors"
            >
              How It works
            </Link>
            <Link 
              href="/#subjects" 
              className="text-white font-serif text-xl hover:text-primary-100 transition-colors"
            >
              Subjects
            </Link>
            <Link 
              href="/#features" 
              className="text-white font-serif text-xl hover:text-primary-100 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/#pricing" 
              className="text-white font-serif text-xl hover:text-primary-100 transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/signup" 
              className="text-white font-serif text-xl hover:text-primary-100 transition-colors"
            >
              Sign-Up
            </Link>
            {isAuthenticated() ? (
              <button
                onClick={logout}
                className="bg-accent-500 hover:bg-accent-600 text-black px-6 py-3 rounded font-serif text-xl transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-accent-500 hover:bg-accent-600 text-black px-6 py-3 rounded font-serif text-xl transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}


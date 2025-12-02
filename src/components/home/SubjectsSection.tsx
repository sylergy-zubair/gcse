'use client';

import { getAllSubjects } from '@/lib/api/subjects';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

interface Subject {
  id: string;
  name: string;
  description?: string;
}

const DEFAULT_SUBJECTS = [
  { id: '1', name: 'Literature' },
  { id: '2', name: 'Grammar' },
  { id: '3', name: 'Math' },
  { id: '4', name: 'Physics' },
  { id: '5', name: 'Chemistry' },
  { id: '6', name: 'Biology' },
];

// B&W SVG Icons for each subject
const SubjectIcon = ({ name }: { name: string }) => {
  const iconSize = 48;
  
  switch (name) {
    case 'Literature':
      // Open book icon
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 12C16 10.8954 16.8954 10 18 10H24C25.1046 10 26 10.8954 26 12V52C26 53.1046 25.1046 54 24 54H18C16.8954 54 16 53.1046 16 52V12Z" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M38 12C38 10.8954 38.8954 10 40 10H46C47.1046 10 48 10.8954 48 12V52C48 53.1046 47.1046 54 46 54H40C38.8954 54 38 53.1046 38 52V12Z" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M16 20H26M16 28H26M38 20H48M38 28H48" stroke="black" strokeWidth="2"/>
          <path d="M26 12H38" stroke="black" strokeWidth="2"/>
        </svg>
      );
    case 'Grammar':
      // Document with A B text
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8C12.8954 8 12 8.89543 12 10V54C12 55.1046 12.8954 56 14 56H50C51.1046 56 52 55.1046 52 54V10C52 8.89543 51.1046 8 50 8H14Z" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M18 18H46" stroke="black" strokeWidth="2"/>
          <text x="32" y="38" fontSize="18" fontWeight="bold" fill="black" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif">A B</text>
        </svg>
      );
    case 'Math':
      // Computer monitor with math symbols
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="44" height="32" rx="2" stroke="black" strokeWidth="2" fill="none"/>
          <rect x="14" y="18" width="36" height="24" fill="black" opacity="0.1"/>
          <path d="M20 28L24 32L20 36" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M28 28H36" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M28 36H36" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          <path d="M40 28L44 32L40 36" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 46L24 50L46 50L52 46" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'Physics':
      // Atom/quantum symbol
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="32" cy="32" rx="24" ry="8" stroke="black" strokeWidth="2" fill="none" transform="rotate(0 32 32)"/>
          <ellipse cx="32" cy="32" rx="24" ry="8" stroke="black" strokeWidth="2" fill="none" transform="rotate(60 32 32)"/>
          <ellipse cx="32" cy="32" rx="24" ry="8" stroke="black" strokeWidth="2" fill="none" transform="rotate(120 32 32)"/>
          <circle cx="32" cy="32" r="6" fill="black"/>
        </svg>
      );
    case 'Chemistry':
      // Laboratory beakers
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 20L18 52C18 54.2091 19.7909 56 22 56H26C28.2091 56 30 54.2091 30 52V20" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M16 20L18 16H30L32 20" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M34 20L34 52C34 54.2091 35.7909 56 38 56H42C44.2091 56 46 54.2091 46 52V20" stroke="black" strokeWidth="2" fill="none"/>
          <path d="M32 20L34 16H46L48 20" stroke="black" strokeWidth="2" fill="none"/>
        </svg>
      );
    case 'Biology':
      // DNA double helix
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8C20 8 24 16 20 24C16 32 20 40 20 40" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M20 24C20 24 24 32 20 40C16 48 20 56 20 56" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M44 8C44 8 40 16 44 24C48 32 44 40 44 40" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M44 24C44 24 40 32 44 40C48 48 44 56 44 56" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="20" cy="16" r="2" fill="black"/>
          <circle cx="20" cy="32" r="2" fill="black"/>
          <circle cx="20" cy="48" r="2" fill="black"/>
          <circle cx="44" cy="16" r="2" fill="black"/>
          <circle cx="44" cy="32" r="2" fill="black"/>
          <circle cx="44" cy="48" r="2" fill="black"/>
          <path d="M20 16L44 16M20 32L44 32M20 48L44 48" stroke="black" strokeWidth="1.5"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function SubjectsSection() {
  const [subjects, setSubjects] = useState<Subject[]>(DEFAULT_SUBJECTS);

  useEffect(() => {
    // Try to fetch subjects from API, fallback to defaults
    getAllSubjects()
      .then(setSubjects)
      .catch(() => {
        // Use default subjects if API fails
        setSubjects(DEFAULT_SUBJECTS);
      });
  }, []);

  return (
    <section id="subjects" className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-24 xl:px-32 2xl:px-[177px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-semibold text-[32px] text-black mb-4">
            Explore Subjects
          </h2>
          <div className="w-[447px] h-[9px] bg-accent-500 mx-auto"></div>
        </div>

        {/* Subjects Grid - 6 columns, 1 row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {subjects.slice(0, 6).map((subject) => (
            <div
              key={subject.id}
              className="bg-neutral-200 p-4 rounded-lg flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
            >
              {/* Subject Icon */}
              <div className="flex items-center justify-center">
                <SubjectIcon name={subject.name} />
              </div>
              
              {/* Subject Name */}
              <h3 className="font-sans font-medium text-lg text-black text-center">
                {subject.name}
              </h3>
              
              {/* Try Now Button */}
              <Button
                variant="primary"
                href={`/subjects/${subject.id}`}
                className="w-full text-[14px] py-1.5 px-4"
              >
                Try Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


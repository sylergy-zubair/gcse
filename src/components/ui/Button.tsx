import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  href?: string;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-8 py-4 rounded font-serif text-xl transition-colors inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-700',
    secondary: 'bg-primary-300 text-black hover:bg-primary-500',
    accent: 'bg-accent-500 text-black hover:bg-accent-600',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}


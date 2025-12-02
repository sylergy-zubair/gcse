import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-24 h-16',
    md: 'w-32 h-20',
    lg: 'w-40 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 160 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blue background */}
        <rect width="160" height="100" fill="#1e40af" rx="4" />
        
        {/* Top geometric design - horizontal line with upward triangle */}
        <g transform="translate(80, 20)">
          <line x1="-30" y1="0" x2="30" y2="0" stroke="white" strokeWidth="2" />
          <polygon points="0,-8 -6,0 6,0" fill="white" />
        </g>
        
        {/* GCSE Text */}
        <text
          x="80"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontFamily="serif"
          fontWeight="bold"
          fontSize="32"
          className={textSizes[size]}
        >
          GCSE
        </text>
        
        {/* Bottom geometric design - horizontal line with downward triangle */}
        <g transform="translate(80, 80)">
          <line x1="-30" y1="0" x2="30" y2="0" stroke="white" strokeWidth="2" />
          <polygon points="0,8 -6,0 6,0" fill="white" />
        </g>
      </svg>
    </div>
  );
}


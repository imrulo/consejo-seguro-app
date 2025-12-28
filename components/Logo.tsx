import React from 'react';

export const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="ConsejoSeguro Logo"
  >
    {/* Shield */}
    <path
      d="M50 5L15 20V45C15 69.3 29.8 90.9 50 98C70.2 90.9 85 69.3 85 45V20L50 5Z"
      fill="#003366"
    />
    {/* Hand extending */}
    <path
      d="M50 75C50 75 35 60 35 50C35 40 50 40 50 40"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M50 75C50 75 65 60 65 50C65 40 50 40 50 40"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Globe hint */}
    <circle cx="50" cy="35" r="8" fill="#008000" />
  </svg>
);

export default Logo;

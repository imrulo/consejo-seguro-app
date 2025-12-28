import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, className, onClick, hoverable = false }: CardProps) {
  const handleClick = () => {
    if (onClick) {
      // Haptic feedback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6",
        // Interactive states
        (hoverable || onClick) && [
          "cursor-pointer transition-all duration-200",
          "hover:shadow-md hover:-translate-y-1",
          "active:scale-95 active:bg-gray-50" // Visual feedback
        ],
        className
      )}
    >
      {children}
    </div>
  );
}

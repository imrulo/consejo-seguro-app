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
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6",
        hoverable && "transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

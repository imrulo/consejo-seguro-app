"use client";

import React, { useState } from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import BottomSheetModal from './BottomSheetModal';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Accepts JSX (e.g., <Bus />)
  content: React.ReactNode; // The modal content
  variant?: 'default' | 'danger';
}

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  content, 
  variant = 'default' 
}: FeatureCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // Haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={clsx(
          "w-full text-left bg-white rounded-xl shadow-md border border-gray-100 p-4 relative group transition-all duration-200",
          "hover:shadow-lg hover:-translate-y-1 active:scale-95 active:shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "flex flex-col h-full min-h-[140px]"
        )}
      >
        <div className="flex justify-between items-start mb-3">
          <div className={clsx(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
            variant === 'danger' ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
          )}>
            {/* Render the icon directly if it's a ReactNode */}
            {icon}
          </div>
          <div className="opacity-60 group-hover:opacity-100 transition-opacity text-gray-400">
            <ChevronRight size={20} />
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-snug">
          {description}
        </p>
      </button>

      <BottomSheetModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title={title}
        variant={variant}
      >
        {content}
      </BottomSheetModal>
    </>
  );
}

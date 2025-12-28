"use client";

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'danger';
}

export default function Modal({ isOpen, onClose, title, children, variant = 'default' }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      // Haptic feedback on open
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match animation duration
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={clsx(
        "fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300",
        isOpen ? "visible" : "invisible pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div 
        className={clsx(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Modal / Bottom Sheet Content */}
      <div className={clsx(
        "relative w-full max-w-lg bg-white shadow-2xl transform transition-all duration-300 ease-out",
        // Mobile: Bottom Sheet style
        "rounded-t-2xl sm:rounded-2xl", 
        // Animations
        isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-full sm:translate-y-10 opacity-0 sm:scale-95",
        variant === 'danger' && "border-t-4 border-red-600"
      )}>
        {/* Drag Handle for Mobile */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className={clsx(
            "text-lg font-bold font-condensed",
            variant === 'danger' ? "text-red-600" : "text-gray-900"
          )}>
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-90"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 max-h-[80vh] overflow-y-auto overscroll-contain pb-10 sm:pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}

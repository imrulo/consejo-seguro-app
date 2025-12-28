"use client";

import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className={clsx(
        "relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-all animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95",
        variant === 'danger' && "border-t-4 border-red-600"
      )}>
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className={clsx(
            "text-lg font-bold font-condensed",
            variant === 'danger' ? "text-red-600" : "text-gray-900"
          )}>
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

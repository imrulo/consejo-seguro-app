"use client";

import React from 'react';
import { AlertTriangle, Languages, Bus } from 'lucide-react';

interface QuickActionBarProps {
  onEmergency: () => void;
  onTranslator: () => void;
  onTransport: () => void;
}

export default function QuickActionBar({ onEmergency, onTranslator, onTransport }: QuickActionBarProps) {
  
  const handlePress = (action: () => void) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
    action();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        <button 
          onClick={() => handlePress(onTransport)}
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 active:text-primary active:bg-gray-50 active:scale-90 transition-all rounded-lg"
        >
          <Bus size={24} />
          <span className="text-[10px] font-bold mt-1">Transporte</span>
        </button>

        <button 
          onClick={() => handlePress(onEmergency)}
          className="flex flex-col items-center justify-center w-full h-full text-red-600 active:scale-90 transition-all relative -top-4"
        >
          <div className="bg-red-600 text-white p-3 rounded-full shadow-lg border-4 border-white active:bg-red-700">
            <AlertTriangle size={28} />
          </div>
          <span className="text-[10px] font-bold mt-1 text-red-700">SOS</span>
        </button>

        <button 
          onClick={() => handlePress(onTranslator)}
          className="flex flex-col items-center justify-center w-full h-full text-gray-600 active:text-primary active:bg-gray-50 active:scale-90 transition-all rounded-lg"
        >
          <Languages size={24} />
          <span className="text-[10px] font-bold mt-1">Traductor</span>
        </button>
      </div>
    </div>
  );
}

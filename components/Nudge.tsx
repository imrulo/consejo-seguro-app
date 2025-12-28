"use client";

import React, { useState, useEffect } from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';

interface NudgeProps {
  id: string;
  triggerCount: number;
  message: string;
  icon?: React.ReactNode;
}

// Global hook for nudges (could be context in larger app)
export const useNudges = () => {
  const [activeNudge, setActiveNudge] = useState<NudgeProps | null>(null);

  const checkNudge = (id: string, currentCount: number) => {
    const dismissed = localStorage.getItem(`cs_nudge_${id}_dismissed`);
    if (dismissed) return;

    if (id === 'transport_fav' && currentCount >= 2) {
      setActiveNudge({
        id: 'transport_fav',
        triggerCount: 2,
        message: "¿Usas mucho el transporte? Fíjalo en favoritos ⭐",
        icon: <Lightbulb className="text-yellow-500" size={20} />
      });
    } else if (id === 'translator_audio' && currentCount >= 1) {
      setActiveNudge({
        id: 'translator_audio',
        triggerCount: 1,
        message: "El audio funciona sin internet. Pruébalo.",
        icon: <Volume2 className="text-blue-500" size={20} />
      });
    }
  };

  const dismissNudge = () => {
    if (activeNudge) {
      localStorage.setItem(`cs_nudge_${activeNudge.id}_dismissed`, 'true');
      setActiveNudge(null);
    }
  };

  return { activeNudge, checkNudge, dismissNudge };
};

export function Nudge({ nudge, onDismiss }: { nudge: NudgeProps, onDismiss: () => void }) {
  if (!nudge) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-full">
            {nudge.icon}
          </div>
          <p className="text-sm font-medium pr-2">{nudge.message}</p>
        </div>
        <button 
          onClick={onDismiss}
          className="text-gray-400 hover:text-white px-2 py-1 text-xs font-bold uppercase tracking-wider border border-gray-700 rounded hover:bg-gray-800"
        >
          OK
        </button>
      </div>
    </div>
  );
}

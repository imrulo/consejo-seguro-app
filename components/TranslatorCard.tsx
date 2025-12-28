"use client";

import React, { useState } from 'react';
import { Volume2, Maximize2, Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface TranslatorCardProps {
  spanishText: string;
  serbianText: string;
  pronunciation?: string; // Phonetic reading
  category: 'medical' | 'police' | 'housing' | 'general';
}

export default function TranslatorCard({ spanishText, serbianText, pronunciation, category }: TranslatorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const colors = {
    medical: 'bg-red-50 border-red-200 text-red-800',
    police: 'bg-blue-50 border-blue-200 text-blue-800',
    housing: 'bg-purple-50 border-purple-200 text-purple-800',
    general: 'bg-gray-50 border-gray-200 text-gray-800'
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(serbianText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would play TTS
    alert("Reproduciendo audio en serbio... (Simulado)");
  };

  return (
    <div 
      className={clsx(
        "relative w-full rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg",
        isFlipped ? "bg-white border-primary shadow-xl scale-105 z-10" : colors[category],
        "h-48"
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="absolute top-3 right-3 flex gap-2">
        <button 
          onClick={handlePlay}
          className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm"
          aria-label="Escuchar pronunciación"
        >
          <Volume2 size={18} />
        </button>
        {isFlipped && (
          <button 
            onClick={handleCopy}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm"
            aria-label="Copiar texto"
          >
            {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
          </button>
        )}
      </div>

      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        {!isFlipped ? (
          <>
            <span className="text-xs uppercase tracking-wider font-bold opacity-60 mb-2">Español</span>
            <p className="text-xl font-bold leading-tight">{spanishText}</p>
            <div className="mt-4 flex items-center gap-2 text-sm opacity-70">
              <Maximize2 size={14} />
              <span>Toca para mostrar en Serbio</span>
            </div>
          </>
        ) : (
          <>
            <span className="text-xs uppercase tracking-wider font-bold text-primary mb-2">Mostrar a local</span>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">{serbianText}</p>
            {pronunciation && (
              <p className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                / {pronunciation} /
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

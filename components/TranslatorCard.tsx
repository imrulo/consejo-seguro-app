"use client";

import React, { useState, useEffect } from 'react';
import { Volume2, Maximize2, Copy, Check, Pause, Star } from 'lucide-react';
import { clsx } from 'clsx';

interface TranslatorCardProps {
  id?: string;
  spanishText: string;
  serbianText: string;
  pronunciation?: string;
  category: 'medical' | 'police' | 'housing' | 'general';
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function TranslatorCard({ 
  id,
  spanishText, 
  serbianText, 
  pronunciation, 
  category,
  isFavorite,
  onToggleFavorite
}: TranslatorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(serbianText);
      utterance.lang = 'sr-RS'; 
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tu dispositivo no soporta la reproducción de audio.");
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite();
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
      <div className="absolute top-3 right-3 flex gap-2 z-20">
        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavorite}
            className={clsx(
              "p-2 rounded-full shadow-sm transition-colors",
              isFavorite ? "bg-yellow-100 text-yellow-500" : "bg-white/80 hover:bg-white text-gray-400"
            )}
          >
            <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}

        <button 
          onClick={handlePlay}
          className={clsx(
            "p-2 rounded-full shadow-sm transition-colors",
            isPlaying ? "bg-primary text-white" : "bg-white/80 hover:bg-white text-gray-700"
          )}
          aria-label={isPlaying ? "Detener audio" : "Escuchar pronunciación"}
        >
          {isPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
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
              <span>Toca para mostrar</span>
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

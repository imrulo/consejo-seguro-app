"use client";

import React, { useState, useEffect } from 'react';
import { Star, Pin, ArrowDown } from 'lucide-react';

interface FavoriteItem {
  id: string;
  title: string;
  type: 'phrase' | 'guide';
  action: string;
}

interface FavoritesProps {
  items: FavoriteItem[];
  onNavigate: (action: string) => void;
}

export default function Favorites({ items, onNavigate }: FavoritesProps) {
  // If no favorites, show Educational Empty State
  if (items.length === 0) {
    return (
      <div className="mx-4 mb-6 bg-white border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center text-center">
        <div className="bg-yellow-50 p-2 rounded-full mb-2 animate-pulse">
          <Star size={20} className="text-yellow-500 fill-yellow-500" />
        </div>
        <p className="text-sm font-bold text-gray-800 mb-1">
          Tus atajos rápidos
        </p>
        <p className="text-xs text-gray-500 mb-0">
          Toca la estrella ⭐ en cualquier guía o frase para guardarla aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Pin size={12} /> Accesos Directos
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {items.map((fav) => (
          <button
            key={fav.id}
            onClick={() => onNavigate(fav.action)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            <Star size={14} className="text-accent fill-accent" />
            <span className="text-sm font-bold text-gray-700">{fav.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

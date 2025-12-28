"use client";

import React, { useState, useEffect } from 'react';
import { Star, Pin } from 'lucide-react';

interface FavoriteItem {
  id: string;
  title: string;
  type: 'phrase' | 'guide';
  action: string;
}

interface FavoritesProps {
  onNavigate: (action: string) => void;
}

export default function Favorites({ onNavigate }: FavoritesProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('cs_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    } else {
      // Default favorites for new users
      setFavorites([
        { id: 'fav1', title: 'Necesito un médico', type: 'phrase', action: 'open_doctor' },
        { id: 'fav2', title: 'Pagar el Bus', type: 'guide', action: 'open_transport' }
      ]);
    }
  }, []);

  if (favorites.length === 0) return null;

  return (
    <div className="mx-4 mb-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Pin size={12} /> Accesos Directos
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {favorites.map((fav) => (
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

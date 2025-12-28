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
  items: FavoriteItem[];
  onNavigate: (action: string) => void;
}

export default function Favorites({ items, onNavigate }: FavoritesProps) {
  if (items.length === 0) return null;

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

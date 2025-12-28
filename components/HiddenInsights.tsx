"use client";

import React from 'react';
import { X, Activity, Calendar, Star, BarChart2 } from 'lucide-react';
import { useLocalAnalytics } from '@/hooks/useLocalAnalytics';

interface HiddenInsightsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiddenInsights({ isOpen, onClose }: HiddenInsightsProps) {
  const { metrics, getDaysActive } = useLocalAnalytics();
  
  if (!isOpen) return null;

  const daysActive = getDaysActive();
  
  // Find most used feature
  const sortedMetrics = Object.entries(metrics).sort(([,a], [,b]) => b - a);
  const topFeature = sortedMetrics[0];

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 text-green-400 font-mono p-6 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-8 border-b border-green-900 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Activity size={20} />
          SYSTEM_INSIGHTS
        </h2>
        <button onClick={onClose} className="text-green-600 hover:text-green-400">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-900/20 p-4 rounded border border-green-900">
          <p className="text-xs text-green-600 mb-1">DAYS_ACTIVE</p>
          <p className="text-3xl font-bold flex items-center gap-2">
            <Calendar size={20} />
            {daysActive}
          </p>
        </div>
        <div className="bg-green-900/20 p-4 rounded border border-green-900">
          <p className="text-xs text-green-600 mb-1">FAVORITES_ADDED</p>
          <p className="text-3xl font-bold flex items-center gap-2">
            <Star size={20} />
            {metrics['favorites_added'] || 0}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold mb-4 border-b border-green-900 pb-1 w-max">USAGE_LOGS</h3>
        <div className="space-y-2">
          {sortedMetrics.length > 0 ? (
            sortedMetrics.map(([key, value]) => (
              <div key={key} className="flex justify-between items-center bg-green-900/10 p-2 rounded">
                <span className="uppercase text-xs">{key.replace('_', ' ')}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))
          ) : (
            <p className="text-sm opacity-50">NO_DATA_YET</p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-green-900 text-[10px] opacity-50 text-center">
        LOCAL_STORAGE_ONLY // NO_CLOUD_SYNC // PRIVACY_MODE_ACTIVE
      </div>
    </div>
  );
}

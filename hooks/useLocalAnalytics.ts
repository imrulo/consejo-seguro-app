"use client";

import { useState, useEffect } from 'react';

// Keys for localStorage
const ANALYTICS_PREFIX = 'cs_metrics_';

// We allow any string for events now to support dynamic tracking
export const useLocalAnalytics = () => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [lastUsed, setLastUsed] = useState<Record<string, string>>({});

  // Load metrics on mount
  useEffect(() => {
    const loadedMetrics: Record<string, number> = {};
    const loadedLastUsed: Record<string, string> = {};
    
    // Scan localStorage for metrics
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(ANALYTICS_PREFIX) && key.endsWith('_count')) {
          const eventName = key.replace(ANALYTICS_PREFIX, '').replace('_count', '');
          const count = localStorage.getItem(key);
          const time = localStorage.getItem(`${ANALYTICS_PREFIX}${eventName}_last`);
          
          if (count) loadedMetrics[eventName] = parseInt(count);
          if (time) loadedLastUsed[eventName] = time;
        }
      }
    }
    
    setMetrics(loadedMetrics);
    setLastUsed(loadedLastUsed);
  }, []);

  const trackEvent = (event: string) => {
    const keyCount = `${ANALYTICS_PREFIX}${event}_count`;
    const keyTime = `${ANALYTICS_PREFIX}${event}_last`;
    
    const currentCount = parseInt(localStorage.getItem(keyCount) || '0') + 1;
    const currentTime = new Date().toISOString();
    
    localStorage.setItem(keyCount, currentCount.toString());
    localStorage.setItem(keyTime, currentTime);
    
    // Update state to reflect changes immediately
    setMetrics(prev => ({ ...prev, [event]: currentCount }));
    setLastUsed(prev => ({ ...prev, [event]: currentTime }));
  };

  const getDaysActive = () => {
    if (typeof window === 'undefined') return 0;
    const firstRun = localStorage.getItem('cs_first_run_date');
    if (!firstRun) {
      localStorage.setItem('cs_first_run_date', new Date().toISOString());
      return 1;
    }
    const diff = new Date().getTime() - new Date(firstRun).getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  return { trackEvent, metrics, lastUsed, getDaysActive };
};

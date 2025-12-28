"use client";

import { useState, useEffect } from 'react';

// Keys for localStorage
const ANALYTICS_PREFIX = 'cs_metrics_';
const EVENTS = [
  'transporte_used',
  'translator_used',
  'sos_opened',
  'favorites_added',
  'papers_opened',
  'community_opened'
] as const;

type EventType = typeof EVENTS[number];

export const useLocalAnalytics = () => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [lastUsed, setLastUsed] = useState<Record<string, string>>({});

  // Load metrics on mount
  useEffect(() => {
    const loadedMetrics: Record<string, number> = {};
    const loadedLastUsed: Record<string, string> = {};
    
    EVENTS.forEach(event => {
      const count = localStorage.getItem(`${ANALYTICS_PREFIX}${event}_count`);
      const time = localStorage.getItem(`${ANALYTICS_PREFIX}${event}_last`);
      
      if (count) loadedMetrics[event] = parseInt(count);
      if (time) loadedLastUsed[event] = time;
    });
    
    setMetrics(loadedMetrics);
    setLastUsed(loadedLastUsed);
  }, []);

  const trackEvent = (event: EventType) => {
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

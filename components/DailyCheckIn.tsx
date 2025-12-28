"use client";

import React, { useState, useEffect } from 'react';
import { ThumbsUp, AlertCircle, Check } from 'lucide-react';

export default function DailyCheckIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastCheckIn = localStorage.getItem('cs_last_checkin_date');

    if (lastCheckIn !== today) {
      setIsVisible(true);
    }
  }, []);

  const handleResponse = (response: 'good' | 'bad') => {
    const today = new Date().toDateString();
    localStorage.setItem('cs_last_checkin_date', today);
    localStorage.setItem('cs_daily_status', response);
    
    // Track count locally for history (optional future use)
    const historyKey = 'cs_checkin_history';
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    history.push({ date: today, status: response });
    // Keep only last 30 days
    if (history.length > 30) history.shift();
    localStorage.setItem(historyKey, JSON.stringify(history));

    setAnswered(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  if (!isVisible) return null;

  if (answered) {
    return (
      <div className="mx-4 mb-6 bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-center gap-2 animate-in fade-in">
        <Check size={20} className="text-green-600" />
        <p className="text-sm font-bold text-green-800">¡Nos alegra saberlo!</p>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-in slide-in-from-top-2">
      <h3 className="font-bold text-gray-900 mb-3 text-center">¿Cómo te trata Serbia hoy?</h3>
      <div className="flex gap-3">
        <button 
          onClick={() => handleResponse('good')}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 py-3 rounded-lg border border-gray-200 hover:border-green-200 transition-all font-medium text-sm active:scale-95"
        >
          <ThumbsUp size={18} />
          Todo bien
        </button>
        <button 
          onClick={() => handleResponse('bad')}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 py-3 rounded-lg border border-gray-200 hover:border-orange-200 transition-all font-medium text-sm active:scale-95"
        >
          <AlertCircle size={18} />
          Día difícil
        </button>
      </div>
    </div>
  );
}

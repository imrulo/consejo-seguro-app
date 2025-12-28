"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import HiddenInsights from './HiddenInsights';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [survivalMode, setSurvivalMode] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  
  // Logic for Long Press
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setShowInsights(true);
    }, 5000); // 5 seconds
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Trámites', href: '#tramites' },
    { name: 'Guías', href: '#guias' },
    { name: 'Recursos', href: '#recursos' },
  ];

  return (
    <>
      <HiddenInsights isOpen={showInsights} onClose={() => setShowInsights(false)} />
      
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Long Press Trigger */}
            <div 
              className="flex items-center space-x-2 select-none cursor-pointer"
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
            >
              <Logo className="h-10 w-10" />
              <Link href="/">
                <span className="font-condensed font-bold text-xl text-primary tracking-tight hidden sm:block">
                  ConsejoSeguro
                </span>
              </Link>
            </div>

            {/* Survival Mode Toggle (Mobile Prominent) */}
            <button 
              onClick={() => setSurvivalMode(!survivalMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                survivalMode 
                  ? 'bg-red-600 text-white shadow-lg animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ShieldAlert size={16} />
              {survivalMode ? 'MODO SOS ACTIVADO' : 'Modo SOS'}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-500 hover:text-primary flex items-center gap-1">
                <Globe size={20} />
                <span className="text-sm font-medium">ES</span>
              </button>
              <Button variant="primary" size="sm">
                Descargar App
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-primary p-2"
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary">
                  <Globe size={20} />
                  <span>Cambiar idioma</span>
                </button>
                <Button fullWidth>Descargar App</Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

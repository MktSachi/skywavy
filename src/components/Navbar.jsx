'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import { WiDaySunny } from 'react-icons/wi';

export default function Navbar({ onSearch, currentLocation }) {
  const [city, setCity] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <nav className="bg-gradient-to-r from-[#0a1929] via-[#0d3d62] to-[#1e5a8e] backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Hamburger Menu (Mobile) & Logo */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-300 hover:text-blue-400 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-1 md:gap-2">
              <WiDaySunny className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                SkyCast
              </span>
            </div>

            {/* Navigation Links - Desktop Only */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 text-slate-300">
              <button 
                onClick={() => scrollToSection('home')} 
                className="hover:text-blue-400 transition-colors cursor-pointer text-sm lg:text-base whitespace-nowrap"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('forecast')} 
                className="hover:text-blue-400 transition-colors cursor-pointer text-sm lg:text-base whitespace-nowrap"
              >
                Forecast
              </button>
            </div>
          </div>

          {/* Right: Location and Search Bar */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Current Location - Desktop and Mobile */}
            {currentLocation && (
              <div className="flex items-center gap-1 md:gap-2 text-slate-300 whitespace-nowrap">
                <FiMapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                <span className="text-xs md:text-sm font-medium truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">{currentLocation}</span>
              </div>
            )}

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="w-32 sm:w-48 md:w-64 lg:w-80">
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search for a city..."
                  className="w-full px-3 md:px-4 py-1.5 md:py-2 pr-9 md:pr-10 text-sm md:text-base rounded-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-0.5 md:right-1 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                  aria-label="Search"
                >
                  <FiSearch className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-2 border-t border-slate-700/50 pt-3">
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-slate-300 hover:text-blue-400 transition-colors text-left px-2 py-1.5 hover:bg-slate-700/30 rounded"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('forecast')} 
                className="text-slate-300 hover:text-blue-400 transition-colors text-left px-2 py-1.5 hover:bg-slate-700/30 rounded"
              >
                Forecast
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

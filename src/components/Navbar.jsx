'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { WiDaySunny } from 'react-icons/wi';

export default function Navbar({ onSearch, currentLocation }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo and Location */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <WiDaySunny className="w-10 h-10 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SkyCast
              </span>
            </div>

            {/* Current Location */}
            {currentLocation && (
              <div className="hidden md:flex items-center gap-2 text-slate-300">
                <FiMapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{currentLocation}</span>
              </div>
            )}
          </div>

          {/* Right: Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-2 pr-10 rounded-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                aria-label="Search"
              >
                <FiSearch className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Navigation Links (Optional) */}
          <div className="hidden lg:flex items-center gap-6 text-slate-300">
            <a href="#forecast" className="hover:text-blue-400 transition-colors">
              Forecast
            </a>
            <a href="#hourly" className="hover:text-blue-400 transition-colors">
              Hourly
            </a>
          </div>
        </div>

        {/* Mobile Location */}
        {currentLocation && (
          <div className="md:hidden flex items-center gap-2 text-slate-300 mt-2">
            <FiMapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">{currentLocation}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

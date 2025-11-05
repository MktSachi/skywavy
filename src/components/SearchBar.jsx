'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 pr-12 text-lg rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors bg-white shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
          aria-label="Search"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

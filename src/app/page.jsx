'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import Forecast from '@/components/Forecast';
import { getCurrentWeather, getForecast, getWeatherByCoords, getForecastByCoords } from '@/utils/apiClient';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load weather for user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setLoading(true);
            const [weatherData, forecastData] = await Promise.all([
              getWeatherByCoords(latitude, longitude),
              getForecastByCoords(latitude, longitude),
            ]);
            setWeather(weatherData);
            setForecast(forecastData);
            setError(null);
          } catch (err) {
            console.error('Error fetching weather by location:', err);
            setError('Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.log('Geolocation error:', err);
          // Default to a city if geolocation fails
          handleSearch('London');
        }
      );
    }
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            ☀️ SkyCast
          </h1>
          <p className="text-xl text-gray-600">
            Your Modern Weather Forecast App
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} />
            <Forecast forecast={forecast} />
          </>
        )}

        {/* Empty State */}
        {!loading && !error && !weather && (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-xl">Search for a city to see the weather forecast</p>
          </div>
        )}
      </div>
    </main>
  );
}

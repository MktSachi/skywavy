'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import WeatherCard from '@/components/WeatherCard';
import HourlyForecast from '@/components/HourlyForecast';
import Forecast from '@/components/Forecast';
import { fetchCurrent, fetchForecast } from '@/utils/apiClient';

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
            const forecastData = await fetchForecast(latitude, longitude);
            // Extract current weather from forecast data
            setWeather({
              name: forecastData.city.name,
              main: forecastData.list[0].main,
              weather: forecastData.list[0].weather,
              wind: forecastData.list[0].wind,
            });
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
      const weatherData = await fetchCurrent(city);
      const forecastData = await fetchForecast(weatherData.coord.lat, weatherData.coord.lon);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.message || 'City not found. Please try again.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar onSearch={handleSearch} currentLocation={weather?.name} />
      
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4">
        <div className="container mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
              <p className="mt-4 text-slate-300">Loading weather data...</p>
            </div>
          )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-6 py-4 rounded-lg max-w-md mx-auto">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} />
            <HourlyForecast forecast={forecast} />
            <Forecast forecast={forecast} />
          </>
        )}

        {/* Empty State */}
        {!loading && !error && !weather && (
          <div className="text-center text-slate-400 mt-12">
            <p className="text-xl">Search for a city to see the weather forecast</p>
          </div>
        )}
        </div>
      </main>
    </>
  );
}

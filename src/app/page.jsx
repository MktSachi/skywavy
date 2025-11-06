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
      
      <main className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6"></div>
                <p className="text-xl text-slate-300 animate-pulse">Loading weather data...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="bg-red-900/30 border border-red-500 text-red-300 px-6 py-4 rounded-lg max-w-md">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && !weather && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse-slow">
                  🌤️ Welcome to Skywavy
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 animate-fade-in">
                  Search for a city to see the weather forecast
                </p>
              </div>
            </div>
          )}

          {/* Weather Content */}
          {!loading && !error && weather && (
            <>
              {/* Home Section - Weather Card */}
              <section id="home" className="mb-12">
                <WeatherCard weather={weather} />
              </section>

              {/* Forecast Section */}
              <section id="forecast">
                <HourlyForecast forecast={forecast} />
                <Forecast forecast={forecast} />
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}

'use client';

import { useState, useRef } from 'react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiDust,
  WiFog
} from 'react-icons/wi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const getWeatherIcon = (weatherMain) => {
  const iconClass = "w-10 h-10";
  switch (weatherMain?.toLowerCase()) {
    case 'clear':
      return <WiDaySunny className={iconClass} />;
    case 'clouds':
      return <WiCloudy className={iconClass} />;
    case 'rain':
    case 'drizzle':
      return <WiRain className={iconClass} />;
    case 'snow':
      return <WiSnow className={iconClass} />;
    case 'thunderstorm':
      return <WiThunderstorm className={iconClass} />;
    case 'mist':
    case 'fog':
      return <WiFog className={iconClass} />;
    case 'dust':
    case 'smoke':
    case 'haze':
      return <WiDust className={iconClass} />;
    default:
      return <WiDaySunny className={iconClass} />;
  }
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};

export default function HourlyForecast({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Get the next 8 data points (24 hours - 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h3 className="text-2xl font-bold text-slate-100 mb-6 text-center">24 Hour Forecast</h3>
      
      <div className="relative">
        {/* Left Arrow Button - Mobile Only */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-slate-800/90 hover:bg-slate-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all lg:hidden"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Right Arrow Button - Mobile Only */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-slate-800/90 hover:bg-slate-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all lg:hidden"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="bg-slate-800 rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto border border-slate-700 scrollbar-hide lg:overflow-x-visible"
        >
        <div className="flex gap-3 sm:gap-4 min-w-max lg:min-w-0 lg:justify-between lg:flex-wrap lg:grid lg:grid-cols-4 xl:grid-cols-8">
          {hourlyData.map((hour, index) => (
            <div 
              key={index}
              className="flex flex-col items-center min-w-[90px] sm:min-w-[100px] lg:min-w-0 lg:flex-1 p-3 sm:p-4 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                {index === 0 ? 'Now' : formatTime(hour.dt)}
              </p>
              
              <div className="flex justify-center mb-2 text-blue-400">
                {getWeatherIcon(hour.weather[0]?.main)}
              </div>
              
              <p className="text-lg sm:text-xl font-bold text-slate-100 mb-1">
                {Math.round(hour.main.temp)}°C
              </p>
              
              <p className="text-xs text-slate-400 capitalize text-center px-1">
                {hour.weather[0]?.description}
              </p>
              
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-600 w-full">
                <p className="text-xs text-slate-400 text-center">
                  💧 {hour.main.humidity}%
                </p>
                <p className="text-xs text-slate-400 text-center">
                  💨 {Math.round(hour.wind.speed)} m/s
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

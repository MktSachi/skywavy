'use client';

import { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiThunderstorm,
  WiDust,
  WiFog
} from 'react-icons/wi';

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

  // Get the next 8 data points (24 hours - 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">24-Hour Forecast</h3>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {hourlyData.map((hour, index) => (
            <div 
              key={index}
              className="flex flex-col items-center min-w-[100px] p-4 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <p className="text-sm font-semibold text-gray-600 mb-2">
                {index === 0 ? 'Now' : formatTime(hour.dt)}
              </p>
              
              <div className="flex justify-center mb-2">
                {getWeatherIcon(hour.weather[0]?.main)}
              </div>
              
              <p className="text-xl font-bold text-gray-800 mb-1">
                {Math.round(hour.main.temp)}°C
              </p>
              
              <p className="text-xs text-gray-600 capitalize text-center">
                {hour.weather[0]?.description}
              </p>
              
              <div className="mt-3 pt-3 border-t border-gray-200 w-full">
                <p className="text-xs text-gray-500 text-center">
                  💧 {hour.main.humidity}%
                </p>
                <p className="text-xs text-gray-500 text-center">
                  💨 {Math.round(hour.wind.speed)} m/s
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

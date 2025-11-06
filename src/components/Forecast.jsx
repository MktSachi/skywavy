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
  const iconClass = "w-12 h-12";
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

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function Forecast({ forecast }) {
  if (!forecast || !forecast.list) return null;

  // Filter to get one forecast per day (around noon)
  const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-slate-100 mb-6 text-center">5-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => (
          <div 
            key={index}
            className="bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl hover:bg-slate-700 transition-all border border-slate-700"
          >
            <p className="text-sm font-semibold text-slate-300 mb-3">
              {formatDate(day.dt)}
            </p>
            
            <div className="flex justify-center mb-3 text-blue-400">
              {getWeatherIcon(day.weather[0]?.main)}
            </div>
            
            <p className="text-2xl font-bold text-slate-100 mb-2">
              {Math.round(day.main.temp)}°C
            </p>
            
            <p className="text-sm text-slate-400 capitalize">
              {day.weather[0]?.description}
            </p>
            
            <div className="mt-4 pt-4 border-t border-slate-600">
              <p className="text-xs text-slate-400">
                Wind: {day.wind.speed} m/s
              </p>
              <p className="text-xs text-slate-400">
                Humidity: {day.main.humidity}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

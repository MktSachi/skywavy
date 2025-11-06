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
import { FiWind, FiDroplet } from 'react-icons/fi';

const getWeatherIcon = (weatherMain) => {
  const iconClass = "w-32 h-32 text-white";
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

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const { name, main, weather: weatherInfo, wind } = weather;
  const temp = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);

  return (
    <div className="rounded-3xl shadow-2xl p-5 sm:p-6 md:p-7 text-white max-w-md mx-auto" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1e5a8e 100%)' }}>
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 break-words">{name}</h2>
        <p className="text-base sm:text-lg md:text-xl capitalize mb-3 sm:mb-4 opacity-90">{weatherInfo[0]?.description}</p>
        
        <div className="flex justify-center mb-3 sm:mb-4">
          {getWeatherIcon(weatherInfo[0]?.main)}
        </div>
        
        <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-1 sm:mb-2">{temp}°C</div>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 opacity-90">Feels like {feelsLike}°C</p>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <FiWind className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <p className="text-xs sm:text-sm mb-1 opacity-80">Wind Speed</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold break-words">{wind.speed} m/s</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <FiDroplet className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <p className="text-xs sm:text-sm mb-1 opacity-80">Humidity</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">{main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

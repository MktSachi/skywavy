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
  const iconClass = "w-24 h-24";
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
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-8 text-white max-w-md mx-auto border border-slate-700">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">{name}</h2>
        <p className="text-xl capitalize mb-6">{weatherInfo[0]?.description}</p>
        
        <div className="flex justify-center mb-6">
          {getWeatherIcon(weatherInfo[0]?.main)}
        </div>
        
        <div className="text-6xl font-bold mb-2">{temp}°C</div>
        <p className="text-lg mb-8">Feels like {feelsLike}°C</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <FiWind className="w-6 h-6" />
            </div>
            <p className="text-sm opacity-90">Wind Speed</p>
            <p className="text-xl font-semibold">{wind.speed} m/s</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <FiDroplet className="w-6 h-6" />
            </div>
            <p className="text-sm opacity-90">Humidity</p>
            <p className="text-xl font-semibold">{main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE;

/**
 * Fetch current weather data for a city
 * @param {string} city - City name
 * @returns {Promise} Current weather data
 * @throws {Error} When API request fails
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Celsius
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'current weather');
  }
};

/**
 * Fetch current weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Current weather data
 * @throws {Error} When API request fails
 */
export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'current weather');
  }
};

/**
 * Fetch 24-hour forecast (actually 5-day/3-hour forecast from OpenWeather)
 * Returns the next 8 data points (24 hours worth of 3-hour intervals)
 * @param {string} city - City name
 * @returns {Promise} 24-hour forecast data
 * @throws {Error} When API request fails
 */
export const get24HourForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        cnt: 8, // 8 data points = 24 hours (3-hour intervals)
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, '24-hour forecast');
  }
};

/**
 * Fetch 24-hour forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} 24-hour forecast data
 * @throws {Error} When API request fails
 */
export const get24HourForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        cnt: 8, // 8 data points = 24 hours (3-hour intervals)
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, '24-hour forecast');
  }
};

/**
 * Fetch 5-day forecast
 * @param {string} city - City name
 * @returns {Promise} 5-day forecast data
 * @throws {Error} When API request fails
 */
export const get5DayForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, '5-day forecast');
  }
};

/**
 * Fetch 5-day forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} 5-day forecast data
 * @throws {Error} When API request fails
 */
export const get5DayForecastByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, '5-day forecast');
  }
};

/**
 * Fetch air quality/pollution data by coordinates
 * Note: Air pollution API only works with coordinates, not city names
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Air quality data
 * @throws {Error} When API request fails
 */
export const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'air quality');
  }
};

/**
 * Fetch air quality forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Air quality forecast data
 * @throws {Error} When API request fails
 */
export const getAirQualityForecast = async (lat, lon) => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution/forecast', {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'air quality forecast');
  }
};

/**
 * Get air quality index description
 * @param {number} aqi - Air Quality Index (1-5)
 * @returns {Object} AQI description and color
 */
export const getAQIDescription = (aqi) => {
  const descriptions = {
    1: { label: 'Good', color: 'green', description: 'Air quality is satisfactory' },
    2: { label: 'Fair', color: 'yellow', description: 'Air quality is acceptable' },
    3: { label: 'Moderate', color: 'orange', description: 'Sensitive groups may experience effects' },
    4: { label: 'Poor', color: 'red', description: 'Everyone may experience health effects' },
    5: { label: 'Very Poor', color: 'purple', description: 'Health alert: everyone may experience serious effects' },
  };
  return descriptions[aqi] || descriptions[1];
};

/**
 * Handle API errors consistently
 * @param {Error} error - Error object from axios
 * @param {string} context - Context of the error (e.g., 'current weather')
 * @throws {Error} Formatted error message
 */
const handleApiError = (error, context) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data.message || `Failed to fetch ${context}`;
    console.error(`API Error (${context}):`, error.response.status, message);
    throw new Error(message);
  } else if (error.request) {
    // Request made but no response received
    console.error(`Network Error (${context}):`, error.request);
    throw new Error('Network error. Please check your connection.');
  } else {
    // Something else happened
    console.error(`Error (${context}):`, error.message);
    throw new Error('An unexpected error occurred');
  }
};

// Export all functions as a default object as well
export default {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  get24HourForecast,
  get24HourForecastByCoords,
  get5DayForecast,
  get5DayForecastByCoords,
  getAirQuality,
  getAirQualityForecast,
  getAQIDescription,
};

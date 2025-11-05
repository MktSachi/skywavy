import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric', // Use Celsius
  },
});

/**
 * Fetch current weather data for a city
 * @param {string} city - City name
 * @returns {Promise} Weather data
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Fetch 5-day weather forecast for a city
 * @param {string} city - City name
 * @returns {Promise} Forecast data
 */
export const getForecast = async (city) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Weather data
 */
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

/**
 * Fetch forecast data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Forecast data
 */
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};

export default apiClient;

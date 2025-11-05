import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE;

/**
 * Fetch current weather data for a city
 * @param {string} city - City name
 * @returns {Promise} Weather data
 * @throws {Error} When API request fails
 */
export const fetchCurrent = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use Celsius
      },
    });
    return response.data;
  } catch (error) {
    // Handle HTTP errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data.message);
      throw new Error(error.response.data.message || 'Failed to fetch weather data');
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};

/**
 * Fetch 5-day weather forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} Forecast data
 * @throws {Error} When API request fails
 */
export const fetchForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric', // Use Celsius
      },
    });
    return response.data;
  } catch (error) {
    // Handle HTTP errors
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data.message);
      throw new Error(error.response.data.message || 'Failed to fetch forecast data');
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};

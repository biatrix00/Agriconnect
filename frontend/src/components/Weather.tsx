import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  // Additional farming-specific data
  soil_moisture: number;
  uv_index: number;
  precipitation_probability: number;
}

interface FarmingAdvice {
  condition: string;
  advice: string;
  severity: 'low' | 'medium' | 'high';
}

// Mock weather data for development
const MOCK_WEATHER_DATA: WeatherData = {
  main: {
    temp: 28,
    humidity: 65,
    feels_like: 30,
    pressure: 1012
  },
  wind: {
    speed: 15,
    deg: 180
  },
  weather: [
    {
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  sys: {
    sunrise: 1677649200, // 6:00 AM
    sunset: 1677692400   // 6:00 PM
  },
  visibility: 10000,
  soil_moisture: 45,
  uv_index: 7,
  precipitation_probability: 20
};

const getFarmingAdvice = (weather: WeatherData): FarmingAdvice[] => {
  const advice: FarmingAdvice[] = [];

  // Temperature advice
  if (weather.main.temp > 35) {
    advice.push({
      condition: 'High Temperature',
      advice: 'Consider providing shade for sensitive crops and ensure adequate irrigation. Monitor for heat stress in plants.',
      severity: 'high'
    });
  } else if (weather.main.temp < 10) {
    advice.push({
      condition: 'Low Temperature',
      advice: 'Protect crops from frost damage. Consider using frost covers or moving sensitive plants indoors. Delay planting of temperature-sensitive crops.',
      severity: 'high'
    });
  }

  // Humidity advice
  if (weather.main.humidity > 80) {
    advice.push({
      condition: 'High Humidity',
      advice: 'Monitor for fungal diseases. Ensure good air circulation around plants. Consider applying preventive fungicides.',
      severity: 'medium'
    });
  } else if (weather.main.humidity < 30) {
    advice.push({
      condition: 'Low Humidity',
      advice: 'Increase irrigation frequency and consider using mulch to retain soil moisture. Monitor plants for signs of water stress.',
      severity: 'medium'
    });
  }

  // Wind advice
  if (weather.wind.speed > 20) {
    advice.push({
      condition: 'Strong Winds',
      advice: 'Secure any loose structures and protect tall plants from wind damage. Consider windbreaks for sensitive crops.',
      severity: 'high'
    });
  }

  // UV Index advice
  if (weather.uv_index > 8) {
    advice.push({
      condition: 'High UV Index',
      advice: 'Provide shade for sensitive crops. Consider applying UV-protective sprays. Harvest during early morning or late afternoon.',
      severity: 'high'
    });
  }

  // Soil Moisture advice
  if (weather.soil_moisture < 30) {
    advice.push({
      condition: 'Low Soil Moisture',
      advice: 'Increase irrigation frequency. Consider deep watering to encourage root growth. Apply mulch to retain moisture.',
      severity: 'high'
    });
  } else if (weather.soil_moisture > 70) {
    advice.push({
      condition: 'High Soil Moisture',
      advice: 'Reduce irrigation. Improve drainage if possible. Monitor for root rot and fungal diseases.',
      severity: 'medium'
    });
  }

  // Precipitation advice
  if (weather.precipitation_probability > 70) {
    advice.push({
      condition: 'High Rain Probability',
      advice: 'Prepare for heavy rainfall. Ensure proper drainage. Delay fertilizer application. Harvest ripe crops before heavy rain.',
      severity: 'medium'
    });
  }

  return advice;
};

const getWeatherIcon = (iconCode: string) => {
  const icons: { [key: string]: string } = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️', // scattered clouds
    '04d': '☁️', // broken clouds
    '04n': '☁️', // broken clouds
    '09d': '🌧️', // shower rain
    '09n': '🌧️', // shower rain
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️', // thunderstorm
    '13d': '🌨️', // snow
    '13n': '🌨️', // snow
    '50d': '🌫️', // mist
    '50n': '🌫️', // mist
  };
  return icons[iconCode] || '❓';
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeather(MOCK_WEATHER_DATA);
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Failed to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Information</h2>
        <div className="text-red-500 mb-4">{error}</div>
        <Button
          onClick={() => window.location.reload()}
          variant="gradient"
          className="w-full"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const advice = getFarmingAdvice(weather);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Weather</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-5xl">{getWeatherIcon(weather.weather[0].icon)}</span>
            <div className="text-right">
              <span className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</span>
              <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Feels Like</p>
              <p className="font-medium">{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-medium">{weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="font-medium">{weather.main.pressure} hPa</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <p>Sunrise</p>
                <p className="font-medium">{formatTime(weather.sys.sunrise)}</p>
              </div>
              <div>
                <p>Sunset</p>
                <p className="font-medium">{formatTime(weather.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Conditions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Farming Conditions</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Soil Moisture</p>
              <p className="font-medium">{weather.soil_moisture}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">UV Index</p>
              <p className="font-medium">{weather.uv_index}/10</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rain Chance</p>
              <p className="font-medium">{weather.precipitation_probability}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Visibility</p>
              <p className="font-medium">{weather.visibility / 1000} km</p>
            </div>
          </div>
        </div>

        {/* Farming Advice Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Farming Advice</h2>
          <div className="space-y-3">
            {advice.map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(item.severity)}`}>
                <p className="font-medium">{item.condition}</p>
                <p className="text-sm">{item.advice}</p>
              </div>
            ))}
            {advice.length === 0 && (
              <p className="text-gray-600">Current conditions are favorable for farming activities.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather; 
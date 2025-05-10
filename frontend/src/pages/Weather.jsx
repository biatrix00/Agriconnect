import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:5000/api/weather/${user.location}`);
        setWeather(response.data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {weather?.map((day, index) => (
          <div key={index} className="card">
            <div className="text-lg font-semibold text-gray-900">{day.date}</div>
            <div className="mt-2">
              <div className="text-3xl font-bold text-gray-900">{day.temp}°C</div>
              <div className="text-gray-600 mt-1">{day.description}</div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Humidity</span>
                <span className="text-gray-900">{day.humidity}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Wind Speed</span>
                <span className="text-gray-900">{day.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weather Tips</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Check weather forecast before planning agricultural activities</li>
          <li>• Adjust irrigation schedule based on rainfall predictions</li>
          <li>• Protect crops from extreme weather conditions</li>
          <li>• Plan harvesting activities during favorable weather</li>
          <li>• Monitor humidity levels for pest control</li>
        </ul>
      </div>
    </div>
  );
} 
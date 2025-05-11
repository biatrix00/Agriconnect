import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Calendar, MapPin, AlertCircle, Leaf, Droplet, Wind as WindIcon, Sun as SunIcon } from 'lucide-react';

const Weather = () => {
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [selectedView, setSelectedView] = useState('current');

  // Mock weather data
  const weatherData = {
    current: {
      temperature: 28,
      condition: 'Sunny',
    humidity: 65,
      windSpeed: 12,
      precipitation: 0,
      feelsLike: 30,
      uvIndex: 8,
      visibility: 10,
      pressure: 1013,
      soilMoisture: 45,
      airQuality: 'Good',
      icon: <Sun className="w-12 h-12 text-yellow-500" />
    },
    hourly: [
      { time: 'Now', temp: 28, icon: <Sun className="w-8 h-8 text-yellow-500" /> },
      { time: '1 PM', temp: 29, icon: <Sun className="w-8 h-8 text-yellow-500" /> },
      { time: '2 PM', temp: 30, icon: <Sun className="w-8 h-8 text-yellow-500" /> },
      { time: '3 PM', temp: 29, icon: <Cloud className="w-8 h-8 text-gray-500" /> },
      { time: '4 PM', temp: 28, icon: <Cloud className="w-8 h-8 text-gray-500" /> },
      { time: '5 PM', temp: 27, icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
      { time: '6 PM', temp: 26, icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
      { time: '7 PM', temp: 25, icon: <Cloud className="w-8 h-8 text-gray-500" /> }
    ],
    daily: [
      { day: 'Today', high: 30, low: 24, icon: <Sun className="w-8 h-8 text-yellow-500" /> },
      { day: 'Tue', high: 29, low: 23, icon: <Cloud className="w-8 h-8 text-gray-500" /> },
      { day: 'Wed', high: 28, low: 22, icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
      { day: 'Thu', high: 27, low: 21, icon: <CloudRain className="w-8 h-8 text-blue-500" /> },
      { day: 'Fri', high: 28, low: 22, icon: <Cloud className="w-8 h-8 text-gray-500" /> },
      { day: 'Sat', high: 29, low: 23, icon: <Sun className="w-8 h-8 text-yellow-500" /> },
      { day: 'Sun', high: 30, low: 24, icon: <Sun className="w-8 h-8 text-yellow-500" /> }
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Heavy rainfall expected in the next 24 hours',
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
      },
      {
        type: 'info',
        message: 'High UV index today - take necessary precautions',
        icon: <Sun className="w-5 h-5 text-blue-500" />
      }
    ],
    farmingAdvice: {
      current: 'Ideal conditions for wheat cultivation. Consider irrigation if no rain in next 48 hours.',
      forecast: 'Prepare for light rainfall in next 3 days. Good for rice transplantation.',
      soilConditions: {
        moisture: 'Optimal for most crops',
        temperature: 'Suitable for root development',
        ph: 'Slightly acidic (6.2) - Good for most crops'
      },
      cropRecommendations: [
        {
          name: 'Wheat',
          status: 'Ideal for planting',
          reason: 'Temperature and soil conditions are perfect'
        },
        {
          name: 'Rice',
          status: 'Prepare for transplantation',
          reason: 'Expected rainfall will be beneficial'
        },
        {
          name: 'Vegetables',
          status: 'Good growing conditions',
          reason: 'Moderate temperature and humidity'
        }
      ],
      pestAlerts: [
        {
          type: 'warning',
          message: 'Increased risk of wheat rust due to humidity',
          severity: 'Medium'
        }
      ]
    }
  };

  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

    return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Location Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-600" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none focus:ring-0"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedView('current')}
            className={`px-4 py-2 rounded-lg ${
              selectedView === 'current' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setSelectedView('hourly')}
            className={`px-4 py-2 rounded-lg ${
              selectedView === 'hourly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Hourly
          </button>
          <button
            onClick={() => setSelectedView('daily')}
            className={`px-4 py-2 rounded-lg ${
              selectedView === 'daily' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
            }`}
          >
            7-Day
          </button>
      </div>

        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <div className="mb-6 space-y-2">
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
                {alert.icon}
                <p className="text-gray-700">{alert.message}</p>
            </div>
            ))}
          </div>
        )}

        {/* Current Weather */}
        {selectedView === 'current' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800">{weatherData.current.temperature}°C</h2>
                  <p className="text-gray-600">{weatherData.current.condition}</p>
                </div>
                {weatherData.current.icon}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-gray-600" />
            <div>
                    <p className="text-sm text-gray-600">Feels Like</p>
                    <p className="font-semibold">{weatherData.current.feelsLike}°C</p>
                  </div>
            </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-gray-600" />
            <div>
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="font-semibold">{weatherData.current.humidity}%</p>
                  </div>
            </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-gray-600" />
            <div>
                    <p className="text-sm text-gray-600">Wind</p>
                    <p className="font-semibold">{weatherData.current.windSpeed} km/h</p>
                  </div>
            </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-gray-600" />
            <div>
                    <p className="text-sm text-gray-600">Precipitation</p>
                    <p className="font-semibold">{weatherData.current.precipitation}%</p>
            </div>
          </div>
                <div className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-gray-600" />
              <div>
                    <p className="text-sm text-gray-600">Soil Moisture</p>
                    <p className="font-semibold">{weatherData.current.soilMoisture}%</p>
                  </div>
              </div>
                <div className="flex items-center gap-2">
                  <WindIcon className="w-5 h-5 text-gray-600" />
              <div>
                    <p className="text-sm text-gray-600">Air Quality</p>
                    <p className="font-semibold">{weatherData.current.airQuality}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farming Advice */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Farming Advice</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Current Conditions</h4>
                    <p className="text-green-700">{weatherData.farmingAdvice.current}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Forecast Impact</h4>
                    <p className="text-blue-700">{weatherData.farmingAdvice.forecast}</p>
                  </div>
                </div>
              </div>

              {/* Soil Conditions */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Soil Conditions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Moisture</span>
                    <span className="font-medium">{weatherData.farmingAdvice.soilConditions.moisture}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temperature</span>
                    <span className="font-medium">{weatherData.farmingAdvice.soilConditions.temperature}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">pH Level</span>
                    <span className="font-medium">{weatherData.farmingAdvice.soilConditions.ph}</span>
                  </div>
                </div>
              </div>

              {/* Crop Recommendations */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Crop Recommendations</h3>
                <div className="space-y-4">
                  {weatherData.farmingAdvice.cropRecommendations.map((crop, index) => (
                    <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{crop.name}</h4>
                        <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">
                          {crop.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{crop.reason}</p>
                    </div>
                  ))}
          </div>
        </div>

              {/* Pest Alerts */}
              {weatherData.farmingAdvice.pestAlerts.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Pest Alerts</h3>
                  <div className="space-y-3">
                    {weatherData.farmingAdvice.pestAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
                          <p className="text-gray-700">{alert.message}</p>
                          <p className="text-sm text-gray-500 mt-1">Severity: {alert.severity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
        )}

        {/* Hourly Forecast */}
        {selectedView === 'hourly' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex overflow-x-auto gap-4 pb-4">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-[80px]">
                  <p className="text-gray-600 mb-2">{hour.time}</p>
                  {hour.icon}
                  <p className="font-semibold mt-2">{hour.temp}°C</p>
            </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Forecast */}
        {selectedView === 'daily' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="space-y-4">
              {weatherData.daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="w-16 text-gray-600">{day.day}</p>
                    {day.icon}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">{day.high}°C</p>
                    <p className="text-gray-600">{day.low}°C</p>
        </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather; 
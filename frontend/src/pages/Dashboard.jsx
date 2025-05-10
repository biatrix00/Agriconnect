import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState(null);
  const [schemes, setSchemes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const [weatherRes, marketRes, schemesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/weather/${user.location}`),
          axios.get('http://localhost:5000/api/market'),
          axios.get('http://localhost:5000/api/schemes')
        ]);

        setWeather(weatherRes.data);
        setMarketPrices(marketRes.data);
        setSchemes(schemesRes.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">Loading...</div>
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
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Weather Section */}
      <section className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Weather Forecast</h2>
          <Link to="/weather" className="text-green-600 hover:text-green-700">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {weather?.slice(0, 5).map((day, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">{day.date}</div>
              <div className="text-2xl font-semibold">{day.temp}°C</div>
              <div className="text-gray-600">{day.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Prices Section */}
      <section className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Market Prices</h2>
          <Link to="/market" className="text-green-600 hover:text-green-700">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(marketPrices || {}).slice(0, 3).map(([crop, data]) => (
            <div key={crop} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-lg font-semibold capitalize">{crop}</div>
              <div className="text-gray-600">
                ₹{data.minPrice} - ₹{data.maxPrice} / {data.unit}
              </div>
              <div className="text-sm text-gray-500">Trend: {data.trend}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Government Schemes Section */}
      <section className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Government Schemes</h2>
          <Link to="/schemes" className="text-green-600 hover:text-green-700">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {schemes?.slice(0, 3).map((scheme) => (
            <div key={scheme.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{scheme.title}</h3>
              <p className="text-gray-600">{scheme.description}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 text-sm"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
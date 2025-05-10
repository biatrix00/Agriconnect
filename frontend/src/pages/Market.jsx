import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Market() {
  const [marketPrices, setMarketPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/market');
        setMarketPrices(response.data);
      } catch (err) {
        setError('Failed to fetch market prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">Loading market data...</div>
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
      <h1 className="text-3xl font-bold text-gray-900">Market Prices</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Crop List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Crops</h2>
            <div className="space-y-2">
              {Object.entries(marketPrices || {}).map(([crop, data]) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop({ name: crop, ...data })}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCrop?.name === crop
                      ? 'bg-green-50 text-green-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium capitalize">{crop}</div>
                  <div className="text-sm text-gray-500">
                    ₹{data.minPrice} - ₹{data.maxPrice} / {data.unit}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Crop Details */}
        <div className="lg:col-span-2">
          {selectedCrop ? (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize mb-6">
                {selectedCrop.name}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Price Range</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{selectedCrop.minPrice} - ₹{selectedCrop.maxPrice}
                    </div>
                    <div className="text-gray-500">per {selectedCrop.unit}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Market Trend</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          selectedCrop.trend === 'rising'
                            ? 'bg-green-500'
                            : selectedCrop.trend === 'falling'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                      <span className="capitalize">{selectedCrop.trend}</span>
                    </div>
                  </div>
                </div>

                {selectedCrop.varieties && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Varieties</h3>
                    <div className="space-y-4">
                      {Object.entries(selectedCrop.varieties).map(([variety, data]) => (
                        <div key={variety} className="bg-gray-50 p-4 rounded-lg">
                          <div className="font-medium capitalize">{variety}</div>
                          <div className="text-gray-600">
                            ₹{data.minPrice} - ₹{data.maxPrice} / {data.unit}
                          </div>
                          <div className="text-sm text-gray-500">
                            Trend: {data.trend}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center text-gray-500">
                Select a crop to view detailed information
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Schemes() {
  const [schemes, setSchemes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        setSchemes(response.data);
      } catch (err) {
        setError('Failed to fetch government schemes');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">Loading schemes...</div>
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
      <h1 className="text-3xl font-bold text-gray-900">Government Schemes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Schemes List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Schemes</h2>
            <div className="space-y-2">
              {schemes?.map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedScheme(scheme)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedScheme?.id === scheme.id
                      ? 'bg-green-50 text-green-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{scheme.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">
                    {scheme.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Scheme Details */}
        <div className="lg:col-span-2">
          {selectedScheme ? (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {selectedScheme.title}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">{selectedScheme.description}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Eligibility</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">{selectedScheme.eligibility}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Benefits</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">{selectedScheme.benefits}</p>
                  </div>
                </div>

                <div>
                  <a
                    href={selectedScheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center"
                  >
                    Learn More
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center text-gray-500">
                Select a scheme to view detailed information
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
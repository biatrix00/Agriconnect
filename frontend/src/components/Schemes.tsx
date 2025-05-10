import { Button } from "./ui/button";

interface Scheme {
  id: number;
  title: string;
  description: string;
  link: string;
  eligibility: string;
  benefits: string[];
  lastUpdated: string;
}

const schemes: Scheme[] = [
  {
    id: 1,
    title: "PM-KISAN",
    description: "Income support of ₹6,000 per year to all farmer families across the country",
    link: "https://pmkisan.gov.in",
    eligibility: "All farmer families",
    benefits: [
      "₹6,000 per year in three equal installments",
      "Direct bank transfer",
      "No middlemen involved"
    ],
    lastUpdated: "Updated 2 months ago"
  },
  {
    id: 2,
    title: "Soil Health Card",
    description: "Provides information to farmers on nutrient status of their soil",
    link: "https://soilhealth.dac.gov.in",
    eligibility: "All farmers with land",
    benefits: [
      "Free soil testing",
      "Personalized recommendations",
      "Digital record of soil health"
    ],
    lastUpdated: "Updated 1 month ago"
  },
  {
    id: 3,
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme to provide financial support to farmers",
    link: "https://pmfby.gov.in",
    eligibility: "All farmers growing notified crops",
    benefits: [
      "Comprehensive crop insurance",
      "Low premium rates",
      "Quick claim settlement"
    ],
    lastUpdated: "Updated 3 months ago"
  }
];

const Schemes = () => {
  return (
    <div className="bg-gradient-to-b from-lime-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Government Schemes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and apply for various government schemes designed to support farmers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((scheme) => (
            <div 
              key={scheme.id} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{scheme.title}</h3>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {scheme.eligibility}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {scheme.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {scheme.lastUpdated}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="gradient"
                    className="flex-1"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => window.open(scheme.link, '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schemes; 
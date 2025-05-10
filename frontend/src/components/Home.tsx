import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Typewriter from "typewriter-effect";
import Hero from './Hero';

const agriFacts = [
  "India has 150M+ farmers",
  "Direct sales increase profits by 40%",
  "Organic farming growing at 25% annually",
  "Women constitute 73% of rural workforce",
  "India is world's largest milk producer",
];

const majorCrops = [
  {
    name: "Wheat",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "India's staple food crop",
  },
  {
    name: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Leading producer globally",
  },
  {
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1546094091531-7a372d6c7c57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Essential vegetable crop",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Punjab",
    quote: "AgriConnect helped me increase my profits by connecting directly with consumers.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
  },
  {
    name: "Priya Sharma",
    location: "Karnataka",
    quote: "The community support and knowledge sharing on this platform is invaluable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
  },
  {
    name: "Mohammed Iqbal",
    location: "Kerala",
    quote: "Direct marketplace has transformed how I sell my organic produce.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Agri-Facts Banner */}
      <div className="bg-green-800 text-white py-2 overflow-hidden">
        <div className="animate-scroll flex space-x-8 whitespace-nowrap">
          {agriFacts.map((fact, index) => (
            <span key={index} className="inline-block px-4">
              {fact}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Major Crops Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Major Crops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {majorCrops.map((crop) => (
              <div
                key={crop.name}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{crop.name}</h3>
                  <p className="text-gray-600">{crop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Farmer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <h3 className="text-xl font-semibold mb-3">Direct Marketplace</h3>
              <p className="text-gray-600">
                Buy fresh produce directly from local farmers at competitive prices.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <h3 className="text-xl font-semibold mb-3">Government Schemes</h3>
              <p className="text-gray-600">
                Access information about agricultural subsidies and support programs.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <h3 className="text-xl font-semibold mb-3">Community Forum</h3>
              <p className="text-gray-600">
                Connect with other farmers, share knowledge, and get support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
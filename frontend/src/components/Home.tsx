import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Typewriter from "typewriter-effect";
import Hero from './Hero';
import { ShoppingCart, Users, BookOpen, TrendingUp, Leaf, Sun, Droplets, MessageCircle, X, Send, Loader2, AlertCircle, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    season: "Rabi (Winter)",
    states: ["Punjab", "Haryana", "Uttar Pradesh"],
    yield: "3.5-4.5 tons/hectare"
  },
  {
    name: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Leading producer globally",
    season: "Kharif (Monsoon)",
    states: ["West Bengal", "Punjab", "Uttar Pradesh"],
    yield: "2.5-3.5 tons/hectare"
  },
  {
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Essential vegetable crop",
    season: "Year-round",
    states: ["Karnataka", "Andhra Pradesh", "Maharashtra"],
    yield: "25-30 tons/hectare"
  },
  {
    name: "Potatoes",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Versatile staple crop",
    season: "Rabi (Winter)",
    states: ["Uttar Pradesh", "West Bengal", "Bihar"],
    yield: "20-25 tons/hectare"
  },
  {
    name: "Sugarcane",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Major cash crop",
    season: "Year-round",
    states: ["Uttar Pradesh", "Maharashtra", "Karnataka"],
    yield: "70-80 tons/hectare"
  },
  {
    name: "Cotton",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Leading fiber crop",
    season: "Kharif (Monsoon)",
    states: ["Gujarat", "Maharashtra", "Telangana"],
    yield: "2-3 tons/hectare"
  }
];

const stats = [
  { label: "Active Farmers", value: "50,000+" },
  { label: "Products Listed", value: "100,000+" },
  { label: "Monthly Transactions", value: "₹10Cr+" },
  { label: "States Covered", value: "25+" },
];

const tipOfTheDay = "Plant wheat 2–3 cm deep for optimal germination.";

const Home = () => {
  const { t } = useTranslation();
  const [showKrishika, setShowKrishika] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: "Hello! I'm Krishika, your AI farming assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [showTip, setShowTip] = useState(true);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);
    setError('');

    // Add user message to chat
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add bot response
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: "I'm here to help! What would you like to know about farming?",
        timestamp: new Date()
      }]);
    } catch (err) {
      setError('Unable to connect to Krishika. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Floating Tip of the Day Popup */}
      {showTip && (
        <div className="fixed bottom-8 left-8 z-50 animate-fade-in-up">
          <div className="relative bg-white shadow-2xl rounded-2xl px-6 py-5 flex items-start gap-4 border-l-8 border-green-500 max-w-xs sm:max-w-sm">
            <div className="flex-shrink-0 mt-1">
              <Lightbulb className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-green-700 text-lg mb-1">{t('tipOfTheDay')}</div>
              <div className="text-gray-700 text-base">{t('tipOfTheDayText')}</div>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setShowTip(false)}
              aria-label="Close tip"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Krishika AI Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showKrishika ? (
          <Link to="/ai-assistant">
            <button
              className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{t('askKrishika')}</span>
            </button>
          </Link>
        ) : (
          <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 transition-all duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Krishika</h3>
                  <p className="text-sm text-green-100">AI Farming Assistant</p>
                </div>
              </div>
              <Link to="/ai-assistant" className="hover:bg-green-700 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </Link>
            </div>

            {/* Chat Area */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        chat.type === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{chat.message}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {chat.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-green-100 rounded-lg p-3">
                      <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-start">
                    <div className="bg-red-100 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-white border-t">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/ai-assistant"
                  className="bg-green-50 p-2 rounded-lg text-sm text-gray-700 hover:bg-green-100 transition-colors border border-green-100"
                >
                  {t('cropAdvice')}
                </Link>
                <Link
                  to="/ai-assistant"
                  className="bg-green-50 p-2 rounded-lg text-sm text-gray-700 hover:bg-green-100 transition-colors border border-green-100"
                >
                  {t('marketPrices')}
                </Link>
                <Link
                  to="/ai-assistant"
                  className="bg-green-50 p-2 rounded-lg text-sm text-gray-700 hover:bg-green-100 transition-colors border border-green-100"
                >
                  {t('weatherInfo')}
                </Link>
                <Link
                  to="/ai-assistant"
                  className="bg-green-50 p-2 rounded-lg text-sm text-gray-700 hover:bg-green-100 transition-colors border border-green-100"
                >
                  {t('farmingTips')}
                </Link>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <Link to="/ai-assistant">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask Krishika anything..."
                    className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                  <button
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

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

      {/* Statistics Section */}
      <div className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Major Crops Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">{t('majorCrops')}</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t('majorCropsDesc')}
          </p>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(`cropName_${crop.name.toLowerCase()}`)}</h3>
                  <p className="text-gray-600 mb-4">{t(`cropDesc_${crop.name.toLowerCase()}`)}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p><span className="font-medium">{t('season')}:</span> {t(`season_${crop.season.split(' ')[0].toLowerCase()}`)} {crop.season.includes('(') ? crop.season.match(/\(([^)]+)\)/)[1] : ''}</p>
                    <p><span className="font-medium">{t('majorStates')}:</span> {crop.states.map(state => t(`state_${state.toLowerCase().replace(/ /g, '_')}`)).join(", ")}</p>
                    <p><span className="font-medium">{t('averageYield')}:</span> {crop.yield}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Key Features</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Empowering farmers and consumers with innovative solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Marketplace</h3>
              <p className="text-gray-600">
                Buy fresh produce directly from local farmers at competitive prices.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Government Schemes</h3>
              <p className="text-gray-600">
                Access information about agricultural subsidies and support programs.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Forum</h3>
              <p className="text-gray-600">
                Connect with other farmers, share knowledge, and get support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">What are you looking for?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mt-8">
            {/* Price Check */}
            <Link 
              to="/marketplace" 
              className="group cursor-pointer"
              onClick={() => window.location.href = '/marketplace'}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Price Check</h3>
                <p className="text-gray-600 mb-4">Check current market rates</p>
              </div>
            </Link>

            {/* Marketplace */}
            <Link 
              to="/marketplace" 
              className="group cursor-pointer"
              onClick={() => window.location.href = '/marketplace'}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Marketplace</h3>
                <p className="text-gray-600 mb-4">Buy and sell produce</p>
              </div>
            </Link>

            {/* Forum */}
            <Link 
              to="/forum" 
              className="group cursor-pointer"
              onClick={() => window.location.href = '/forum'}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Forum</h3>
                <p className="text-gray-600 mb-4">Connect with farmers</p>
              </div>
            </Link>

            {/* AI Assistant */}
            <Link 
              to="/ai-assistant" 
              className="group cursor-pointer"
              onClick={() => window.location.href = '/ai-assistant'}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Assistant</h3>
                <p className="text-gray-600 mb-4">Get farming advice</p>
              </div>
            </Link>

            {/* Guides */}
            <Link 
              to="/forum" 
              className="group cursor-pointer"
              onClick={() => window.location.href = '/forum'}
            >
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Guides</h3>
                <p className="text-gray-600 mb-4">Learn farming techniques</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
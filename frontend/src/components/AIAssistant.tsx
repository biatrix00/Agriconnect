import React, { useState } from 'react';
import { Button } from './ui/button';
import { Leaf, Send, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAssistant = () => {
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

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crop advice responses
    if (lowerMessage.includes('crop') || lowerMessage.includes('grow')) {
      return "Based on the current season, I recommend growing:\n\n1. Wheat - Perfect for winter season\n2. Rice - Ideal for monsoon season\n3. Vegetables like tomatoes and potatoes - Good for year-round cultivation\n\nWould you like specific details about any of these crops?";
    }
    
    // Market price responses
    if (lowerMessage.includes('price') || lowerMessage.includes('market')) {
      return "Current market prices (per kg):\n\n- Wheat: ₹45-50\n- Rice: ₹85-90\n- Tomatoes: ₹35-40\n- Potatoes: ₹30-35\n\nThese prices are updated daily. Would you like to know more about specific crops?";
    }
    
    // Weather responses
    if (lowerMessage.includes('weather') || lowerMessage.includes('forecast')) {
      return "The current weather forecast shows:\n\n- Temperature: 25-30°C\n- Humidity: 65-70%\n- Rainfall: 20% chance\n\nPerfect conditions for most crops. Would you like specific weather advice for your crops?";
    }
    
    // Farming tips responses
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice')) {
      return "Here are some essential farming tips:\n\n1. Regular soil testing\n2. Proper irrigation management\n3. Crop rotation practices\n4. Pest control measures\n\nWhich aspect would you like to learn more about?";
    }
    
    // General farming questions
    if (lowerMessage.includes('farm') || lowerMessage.includes('agriculture')) {
      return "I can help you with various aspects of farming:\n\n1. Crop selection and management\n2. Market prices and trends\n3. Weather updates and forecasts\n4. Best farming practices\n\nWhat specific information are you looking for?";
    }
    
    // Default response
    return "I'm here to help with your farming needs. You can ask me about:\n\n1. Crop recommendations\n2. Market prices\n3. Weather forecasts\n4. Farming tips and best practices\n\nWhat would you like to know?";
  };

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
      
      // Get response based on user message
      const botResponse = getResponse(userMessage);
      
      // Add bot response
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: botResponse,
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
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:bg-green-700 p-2 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Krishika</h1>
                <p className="text-green-100">Your AI Farming Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => handleQuickAction("What are the best crops to grow this season?")}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-300"
          >
            <h3 className="font-semibold text-gray-800 mb-1">Crop Advice</h3>
            <p className="text-sm text-gray-600">Get recommendations for your farm</p>
          </button>
          <button
            onClick={() => handleQuickAction("What are the current market prices?")}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-300"
          >
            <h3 className="font-semibold text-gray-800 mb-1">Market Prices</h3>
            <p className="text-sm text-gray-600">Check current market rates</p>
          </button>
          <button
            onClick={() => handleQuickAction("What's the weather forecast?")}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-300"
          >
            <h3 className="font-semibold text-gray-800 mb-1">Weather Info</h3>
            <p className="text-sm text-gray-600">Get weather updates</p>
          </button>
          <button
            onClick={() => handleQuickAction("Share some farming tips")}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-300"
          >
            <h3 className="font-semibold text-gray-800 mb-1">Farming Tips</h3>
            <p className="text-sm text-gray-600">Learn best practices</p>
          </button>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
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

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Krishika anything..."
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 
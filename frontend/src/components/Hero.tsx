import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Shield, 
  Truck, 
  FileText,
  Search,
  MessageSquare,
  Bot,
  BookOpen,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const typewriterPhrases = [
  "Empowering Farmers",
  "Connecting Communities",
  "Smarter Agriculture Starts Here",
  "Sell Without Middlemen"
];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSeason, setCurrentSeason] = useState('');

  // Typewriter effect
  useEffect(() => {
    const current = typewriterPhrases[currentPhrase];
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === current) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length);
        return;
      }
      setDisplayText(
        isDeleting
          ? current.substring(0, displayText.length - 1)
          : current.substring(0, displayText.length + 1)
      );
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  // Season detection
  useEffect(() => {
    const month = new Date().getMonth();
    let season = '';
    if (month >= 2 && month <= 5) season = 'Summer';
    else if (month >= 6 && month <= 9) season = 'Monsoon';
    else if (month >= 10 && month <= 11) season = 'Winter';
    else season = 'Spring';
    setCurrentSeason(season);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Floating time and season banner */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        <span className="text-sm text-gray-600">
          🕓 {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST — 
          It's {currentSeason} Season 🌱
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main heading and subheading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Growing Together: Farmers & Consumers United
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Sell directly. Buy ethically. Connect locally.
          </p>
          
          {/* Typewriter effect */}
          <div className="h-8 text-xl text-green-600 font-medium">
            {displayText}
            <span className="animate-blink">|</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/register?role=farmer">
            <Button
              variant="gradient"
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              I'm a Farmer
            </Button>
          </Link>
          <Link to="/register?role=consumer">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              I'm a Buyer
            </Button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">5,000+</p>
                <p className="text-gray-600">Crops Sold</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">1,200+</p>
                <p className="text-gray-600">Verified Farmers</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">600+</p>
                <p className="text-gray-600">Buyers Connected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Verified Farmers</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Direct Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Easy Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">FSSAI-Compliant</span>
          </div>
        </div>

        {/* Tip of the Day */}
        <div className="bg-green-50 rounded-lg p-4 shadow-sm mb-12">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <h3 className="font-medium text-gray-900">Tip of the Day</h3>
              <p className="text-gray-600">Plant wheat 2–3 cm deep for optimal germination.</p>
            </div>
          </div>
        </div>

        {/* Notification Opt-in */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-green-600" />
              <span className="text-gray-900">Get alerts when prices rise for your crops 📈</span>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-xs"
              />
              <Button variant="gradient">Notify Me</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 
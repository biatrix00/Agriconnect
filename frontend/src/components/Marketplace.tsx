import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ShoppingCart, Plus, Filter, Star, Shield, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  location: string;
  price: number;
  seller: string;
  isOrganic: boolean;
  rating: number;
  isVerified: boolean;
  harvestDate: string;
  description: string;
  transportOptions: string[];
}

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock data - replace with actual API calls
  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Wheat',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 1000,
      location: 'Punjab',
      price: 45,
      seller: 'Rajesh Kumar',
      isOrganic: true,
      rating: 4.5,
      isVerified: true,
      harvestDate: '2024-03-15',
      description: 'Premium quality organic wheat, freshly harvested',
      transportOptions: ['Local Delivery', 'Self Pickup']
    },
    {
      id: '2',
      name: 'Basmati Rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 500,
      location: 'Haryana',
      price: 85,
      seller: 'Priya Sharma',
      isOrganic: true,
      rating: 4.8,
      isVerified: true,
      harvestDate: '2024-02-20',
      description: 'Premium quality basmati rice, perfect for biryani',
      transportOptions: ['Express Delivery', 'Self Pickup']
    },
    {
      id: '3',
      name: 'Fresh Tomatoes',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 200,
      location: 'Karnataka',
      price: 35,
      seller: 'Mohammed Iqbal',
      isOrganic: false,
      rating: 4.2,
      isVerified: true,
      harvestDate: '2024-03-10',
      description: 'Fresh, juicy tomatoes from local farms',
      transportOptions: ['Local Delivery', 'Express Delivery']
    },
    {
      id: '4',
      name: 'Organic Potatoes',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 300,
      location: 'Uttar Pradesh',
      price: 30,
      seller: 'Amit Patel',
      isOrganic: true,
      rating: 4.6,
      isVerified: true,
      harvestDate: '2024-03-01',
      description: 'Organic potatoes, perfect for all dishes',
      transportOptions: ['Local Delivery', 'Self Pickup']
    },
    {
      id: '5',
      name: 'Fresh Onions',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 400,
      location: 'Maharashtra',
      price: 25,
      seller: 'Sunita Desai',
      isOrganic: false,
      rating: 4.3,
      isVerified: true,
      harvestDate: '2024-03-05',
      description: 'Fresh onions from local farms',
      transportOptions: ['Local Delivery', 'Express Delivery']
    },
    {
      id: '6',
      name: 'Organic Cotton',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 100,
      location: 'Gujarat',
      price: 120,
      seller: 'Rajesh Patel',
      isOrganic: true,
      rating: 4.7,
      isVerified: true,
      harvestDate: '2024-02-15',
      description: 'Premium quality organic cotton',
      transportOptions: ['Express Delivery', 'Self Pickup']
    },
    {
      id: '7',
      name: 'Fresh Sugarcane',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 150,
      location: 'Uttar Pradesh',
      price: 40,
      seller: 'Rahul Singh',
      isOrganic: false,
      rating: 4.4,
      isVerified: true,
      harvestDate: '2024-03-12',
      description: 'Fresh sugarcane, perfect for juice',
      transportOptions: ['Local Delivery', 'Express Delivery']
    },
    {
      id: '8',
      name: 'Organic Millets',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quantity: 250,
      location: 'Karnataka',
      price: 95,
      seller: 'Lakshmi Devi',
      isOrganic: true,
      rating: 4.9,
      isVerified: true,
      harvestDate: '2024-02-28',
      description: 'Premium quality organic millets',
      transportOptions: ['Express Delivery', 'Self Pickup']
    }
  ];

  const cropTypes = ['Wheat', 'Rice', 'Tomatoes', 'Potatoes', 'Onions'];
  const regions = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Karnataka'];

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const totalCartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Farmers Market</h1>
          <div className="flex gap-4">
            <Button variant="gradient" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Sell Your Produce
            </Button>
            <Button
              variant="outline"
              className="relative"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products Slider */}
      <div className="max-w-7xl mx-auto mb-8 overflow-hidden">
        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {product.isOrganic && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        Organic
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price}/kg
                      </span>
                      <Button
                        variant="gradient"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              All Listings
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Verified Farmers
            </TabsTrigger>
            <TabsTrigger value="top-rated" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Recommended
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Crop Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Type
              </label>
              <div className="space-y-2">
                {cropTypes.map((crop) => (
                  <div key={crop} className="flex items-center">
                    <Checkbox
                      id={crop}
                      checked={selectedCrops.includes(crop)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCrops([...selectedCrops, crop]);
                        } else {
                          setSelectedCrops(selectedCrops.filter((c) => c !== crop));
                        }
                      }}
                    />
                    <label htmlFor={crop} className="ml-2 text-sm text-gray-600">
                      {crop}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (₹/kg)
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* Sort By Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.isOrganic && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Organic
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Quantity: {product.quantity} kg</p>
                  <p>Location: {product.location}</p>
                  <p>Price: ₹{product.price}/kg</p>
                  <p>Seller: {product.seller}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="gradient"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 transform transition-transform duration-200 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <Button variant="ghost" onClick={() => setShowCart(false)}>
              ×
            </Button>
          </div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} kg × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{totalCartValue}</span>
            </div>
            <Button variant="gradient" className="w-full mt-4">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace; 
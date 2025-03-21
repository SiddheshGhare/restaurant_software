import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Clock, MapPin, Image, AlertCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useRestaurants } from '../context/RestaurantContext';

const RestaurantRegistrationPage: React.FC = () => {
  const { user } = useAuth();
  const { addRestaurant } = useRestaurants();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    introduction: '',
    openingTime: '09:00',
    closingTime: '22:00',
    location: '',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      setError('You must be logged in to register a restaurant');
      return;
    }
    
    if (user.role !== 'restaurant') {
      setError('Only restaurant accounts can register a restaurant');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Add the restaurant to the context
      const restaurantId = addRestaurant({
        ...formData,
        rating: 0,
      });
      
      // In a real app, you would update the user's restaurantId in the database
      // For now, we'll just navigate to the management page
      navigate('/management');
    } catch (err) {
      setError('Failed to register restaurant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0a1029] text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto bg-[#1c2756] rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Register Your Restaurant</h1>
            
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4 flex items-start">
                <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-1">Restaurant Name</label>
                  <div className="relative">
                    <Store size={20} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
                      placeholder="Your Restaurant Name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="introduction" className="block text-gray-300 mb-1">Introduction</label>
                  <textarea
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
                    placeholder="A brief description of your restaurant"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="openingTime" className="block text-gray-300 mb-1">Opening Time</label>
                    <div className="relative">
                      <Clock size={20} className="absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="time"
                        id="openingTime"
                        name="openingTime"
                        value={formData.openingTime}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="closingTime" className="block text-gray-300 mb-1">Closing Time</label>
                    <div className="relative">
                      <Clock size={20} className="absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="time"
                        id="closingTime"
                        name="closingTime"
                        value={formData.closingTime}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-gray-300 mb-1">Location</label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
                      placeholder="123 Restaurant St, City, State"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="image" className="block text-gray-300 mb-1">Restaurant Image URL</label>
                  <div className="relative">
                    <Image size={20} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Provide a URL to an image of your restaurant. Recommended size: 1200x800 pixels.
                  </p>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 py-3 rounded-md font-medium ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#6c63ff] hover:bg-[#5a52d5]'
                }`}
              >
                {isLoading ? 'Registering...' : 'Register Restaurant'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantRegistrationPage;
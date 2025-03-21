import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MenuItemCard from '../components/customer/MenuItemCard';
import ReviewCard from '../components/customer/ReviewCard';
import ReservationForm, { ReservationFormData } from '../components/customer/ReservationForm';
import { restaurants } from '../data/restaurants';
import { reviews } from '../data/reviews';
import { Restaurant, Category } from '../types';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'reservation'>('menu');
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  useEffect(() => {
    const foundRestaurant = restaurants.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      if (foundRestaurant.categories.length > 0) {
        setActiveCategory(foundRestaurant.categories[0].id);
      }
    }

    const filteredReviews = reviews.filter(review => review.restaurantId === id);
    setRestaurantReviews(filteredReviews);
  }, [id]);

  const handleReservationSubmit = (formData: ReservationFormData) => {
    // In a real app, this would send the data to an API
    console.log('Reservation submitted:', formData);
    setReservationSuccess(true);
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setReservationSuccess(false);
    }, 5000);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#0a1029] text-white">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-xl">Loading restaurant details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1029] text-white">
      <Navbar />
      
      <div className="relative h-[400px]">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1029] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-gray-300 mb-2">{restaurant.introduction}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" fill="#fcd34d" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{restaurant.openingTime} - {restaurant.closingTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{restaurant.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex border-b border-[#2a3563] mb-6">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'menu' 
                ? 'text-[#6c63ff] border-b-2 border-[#6c63ff]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'reviews' 
                ? 'text-[#6c63ff] border-b-2 border-[#6c63ff]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Reviews
          </button>
          <button 
            onClick={() => setActiveTab('reservation')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'reservation' 
                ? 'text-[#6c63ff] border-b-2 border-[#6c63ff]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Reservation
          </button>
        </div>
        
        {activeTab === 'menu' && (
          <div>
            <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {restaurant.categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-[#6c63ff] text-white'
                      : 'bg-[#1c2756] text-gray-300 hover:bg-[#2a3563]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.categories
                .find(cat => cat.id === activeCategory)?.items
                .map(item => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <button className="px-4 py-2 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-md">
                Write a Review
              </button>
            </div>
            
            {restaurantReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurantReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-400">
                No reviews yet. Be the first to review this restaurant!
              </p>
            )}
          </div>
        )}
        
        {activeTab === 'reservation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Make a Reservation</h2>
              
              {reservationSuccess && (
                <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
                  Your reservation has been submitted successfully! We'll contact you shortly to confirm.
                </div>
              )}
              
              <ReservationForm 
                restaurantId={restaurant.id} 
                onSubmit={handleReservationSubmit} 
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-[#1c2756] p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-[#6c63ff] mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-300">{restaurant.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={20} className="text-[#6c63ff] mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="text-[#6c63ff] mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-300">contact@{restaurant.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={20} className="text-[#6c63ff] mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium">Opening Hours</h3>
                      <p className="text-gray-300">
                        Monday - Friday: {restaurant.openingTime} - {restaurant.closingTime}<br />
                        Saturday - Sunday: {restaurant.openingTime} - {restaurant.closingTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantPage;
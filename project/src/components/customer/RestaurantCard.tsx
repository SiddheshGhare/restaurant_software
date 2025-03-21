import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block">
      <div className="bg-[#1c2756] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]">
        <div className="h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
            <div className="flex items-center bg-[#6c63ff] px-2 py-1 rounded">
              <Star size={16} className="text-yellow-300 mr-1" />
              <span className="text-white font-medium">{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4 line-clamp-2">{restaurant.introduction}</p>
          
          {restaurant.openingTime && restaurant.closingTime && (
            <div className="flex items-center text-gray-400 mb-2">
              <Clock size={16} className="mr-2" />
              <span>{restaurant.openingTime} - {restaurant.closingTime}</span>
            </div>
          )}
          
          {restaurant.location && (
            <div className="flex items-center text-gray-400">
              <MapPin size={16} className="mr-2" />
              <span className="truncate">{restaurant.location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
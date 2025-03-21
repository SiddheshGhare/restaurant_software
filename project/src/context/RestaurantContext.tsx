import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { restaurants as initialRestaurants } from '../data/restaurants';
import { Restaurant, Category } from '../types';

interface RestaurantContextType {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;
  updateRestaurant: (id: string, restaurant: Partial<Restaurant>) => void;
  getRestaurantById: (id: string) => Restaurant | undefined;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    // Initialize from localStorage if available
    const savedRestaurants = localStorage.getItem('restaurants');
    return savedRestaurants ? JSON.parse(savedRestaurants) : initialRestaurants;
  });

  // Update localStorage whenever restaurants change
  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  const addRestaurant = (restaurant: Omit<Restaurant, 'id'>) => {
    const newRestaurant: Restaurant = {
      ...restaurant,
      id: `${Date.now()}`,
      categories: [],
      rating: 0
    };
    
    setRestaurants(prev => [...prev, newRestaurant]);
    return newRestaurant.id;
  };

  const updateRestaurant = (id: string, restaurantData: Partial<Restaurant>) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === id ? { ...restaurant, ...restaurantData } : restaurant
      )
    );
  };

  const getRestaurantById = (id: string) => {
    return restaurants.find(restaurant => restaurant.id === id);
  };

  return (
    <RestaurantContext.Provider value={{ 
      restaurants, 
      addRestaurant, 
      updateRestaurant, 
      getRestaurantById 
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};
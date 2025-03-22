import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import dotenv from "dotenv"
interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant';
  restaurantId?: string;
}



interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'customer' | 'restaurant') => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

dotenv.config({
    path:'../'
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // This would be replaced with an actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
       
        email: email,
        password: password}
       
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, user);

      console.log('login successful:');
     //console.log( response.data.data._id,);
     const { user1 } = response.data.data;
      setUser({
        id: user1._id,
        name: user1.fullname,
        email:user1.email ,
        role: user1.accountType
       
      });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string, role: 'customer' | 'restaurant') => {
    // This would be replaced with an actual API call
    try {
      // Simulate API call
      const user = {
        fullname: name,
        email: email,
        password: password,
        accountType: role
    };
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, user);
      

      console.log('Registration successful:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      register,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
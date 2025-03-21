import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RestaurantProvider } from './context/RestaurantContext';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ManagementPage from './pages/management/ManagementPage';
import RestaurantRegistrationPage from './pages/RestaurantRegistrationPage';

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register-restaurant" element={<RestaurantRegistrationPage />} />
              <Route path="/management" element={<ManagementPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </RestaurantProvider>
    </AuthProvider>
  );
}

export default App;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#0f1736] text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          DGDign
        </Link>

        {/* <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full py-2 px-4 pr-10 rounded-full bg-[#1c2756] text-white border border-[#3b4784] focus:outline-none focus:border-[#5a68b0]"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div> */}

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {user?.role === 'restaurant' && (
                <Link to="/management" className="hover:text-[#8a9cf5]">
                  Management
                </Link>
              )}
              <Link to="/cart" className="relative hover:text-[#8a9cf5]">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#6c63ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <div className="flex items-center space-x-2">
                <User size={24} />
                <span>{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-[#8a9cf5]"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#8a9cf5]">Login</Link>
              <Link 
                to="/register" 
                className="bg-[#6c63ff] hover:bg-[#5a52d5] px-4 py-2 rounded-full"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
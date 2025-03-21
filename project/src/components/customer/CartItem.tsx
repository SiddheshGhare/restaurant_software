import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center py-4 border-b border-[#2a3563]">
      <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-medium text-white">{item.name}</h3>
        <p className="text-gray-400 text-sm">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#6c63ff] font-bold">Rs {item.price}</span>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2a3563] hover:bg-[#3b4784]"
            >
              <Minus size={16} />
            </button>
            
            <span className="text-white font-medium">{item.quantity}</span>
            
            <button 
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2a3563] hover:bg-[#3b4784]"
            >
              <Plus size={16} />
            </button>
            
            <button 
              onClick={handleRemove}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2a3563] hover:bg-[#3b4784] ml-2"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
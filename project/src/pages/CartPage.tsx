import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Car, CreditCard, Banknote, ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CartItem from '../components/customer/CartItem';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();





  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const availableSlots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4'];
  
  // Function to handle multiple slot selection
  const handleSlotSelection = (slot: string) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot) ? prevSlots.filter((s) => s !== slot) : [...prevSlots, slot]
    );
  };






  // Car Parking States
  const [confirmedParking ,setConfirmedParking]=useState(false)
  const [wantsParking, setWantsParking] = useState(false);
  const [parkingName, setParkingName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [carNumber, setCarNumber] = useState('');

  // Dummy slots for dropdown
 
  
  const [orderType, setOrderType] = useState<'Dine-In' | 'Takeaway' | 'Delivery'>('Dine-In');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const subtotal = getCartTotal();
  const deliveryFee = orderType === "Delivery" ? 30 : 0; // Show delivery fee only if "Delivery" is selected
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    console.log('Order placed:', {
      items: cartItems,
      total,
      orderType,
      paymentMethod,
      customerName,
      customerPhone
    });

    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#0a1029] text-white">
        <Navbar />
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="bg-[#1c2756] max-w-md mx-auto p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for your order. We'll start preparing your food right away.
            </p>
            <Link to="/" className="inline-block px-6 py-3 bg-[#6c63ff] hover:bg-[#5a52d5] rounded-md">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1029] text-white">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Continue Shopping
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#1c2756] rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              <div className="space-y-1">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Order Summary */}
            <div className="bg-[#1c2756] rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Order Type Selection */}
              <div className="flex space-x-3 mb-4">
                {["Dine-In", "Takeaway", "Delivery"].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-lg ${
                      orderType === type ? "bg-blue-600 text-white" : "bg-gray-400"
                    }`}
                    onClick={() => setOrderType(type as "Dine-In" | "Takeaway" | "Delivery")}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>

                {orderType === "Delivery" && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">Delivery Fee</span>
                    <span>Rs {deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-300">Tax</span>
                  <span>Rs {tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-[#2a3563] pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>


            {/* Parking Option */}
            <div className="bg-[#1c2756] rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Car size={24} className="mr-2 text-[#6c63ff]" />
                Do you need parking?
              </h2>

              <div className="flex space-x-3">
                <button
                  className={`px-4 py-2 rounded-lg ${wantsParking ? 'bg-blue-600 text-white' : 'bg-gray-400'}`}
                  onClick={() => setWantsParking(true)}
                >
                  Yes
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${!wantsParking ? 'bg-blue-600 text-white' : 'bg-gray-400'}`}
                  onClick={() => {setWantsParking(false),setConfirmedParking(false)}}
                >
                  No
                </button>
              </div>

              { !confirmedParking && wantsParking && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-gray-300">vehicle Count</label>
                    <input
                      type="text"
                      value={parkingName}
                      onChange={(e) => setParkingName(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white"
                    />
                  </div>
                  <div>
  <label className="block text-gray-300">Available Slots</label>
  <div className="space-y-2">
    {availableSlots.map((slot) => (
      <label key={slot} className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={selectedSlots.includes(slot)}
          onChange={() => handleSlotSelection(slot)}
          className="w-4 h-4"
        />
        <span>{slot}</span>
      </label>
    ))}
  </div>
</div>
                  <div>
                    <label className="block text-gray-300">Car Number</label>
                    <input
                      type="text"
                      value={carNumber}
                      onChange={(e) => setCarNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white"
                    />
                  </div>
                  <button
                    className="w-full py-3 bg-[#6c63ff] hover:bg-[#5a52d5] text-white rounded-md"
                    onClick={() =>setConfirmedParking(true)}
                  >
                    Confirm Parking
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-[#1c2756] rounded-lg shadow-md mt-5 p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {["card", "cash"].map((method) => (
                  <label key={method} className="flex items-center p-3 border border-[#2a3563] rounded-md cursor-pointer hover:border-[#6c63ff]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method as 'card' | 'cash')}
                      className="mr-3"
                    />
                    {method === 'card' ? <CreditCard size={20} className="mr-2 text-[#6c63ff]" /> : <Banknote size={20} className="mr-2 text-[#6c63ff]" />}
                    <span>{method === 'card' ? "Credit/Debit Card" : "Cash on Counter"}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              //disabled={!customerName || !customerPhone}
              className={`w-full py-3 rounded-md font-medium bg-[#6c63ff] hover:bg-[#5a52d5] text-white `}
              //   ${
              //   customerName && customerPhone
              //     ? 'bg-[#6c63ff] hover:bg-[#5a52d5] text-white'
              //     : 'bg-gray-600 cursor-not-allowed text-gray-300'
              //  }
              // `}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

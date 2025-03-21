import React from 'react';
import { Clock, Check, X } from 'lucide-react';
import { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange }) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-[#1c2756] rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-[#2a3563]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {formatDate(order.createdAt)}
          </div>
          <div>
            Payment: {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash'}
          </div>
        </div>
        
        <div className="text-white">
          <p><span className="text-gray-400">Customer:</span> {order.customerName}</p>
          <p><span className="text-gray-400">Phone:</span> {order.customerPhone}</p>
        </div>
      </div>
      
      <div className="p-4 border-b border-[#2a3563]">
        <h4 className="text-white font-medium mb-2">Order Items</h4>
        <ul className="space-y-2">
          {order.items.map(item => (
            <li key={item.id} className="flex justify-between text-gray-300">
              <span>{item.quantity}x {item.name}</span>
              <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-[#2a3563] flex justify-between font-bold text-white">
          <span>Total</span>
          <span>Rs. {order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-white font-medium mb-2">Update Status</h4>
        <div className="flex space-x-2">
          {order.status !== 'pending' && (
            <button 
              onClick={() => onStatusChange(order.id, 'pending')}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm"
            >
              Pending
            </button>
          )}
          
          {order.status !== 'preparing' && (
            <button 
              onClick={() => onStatusChange(order.id, 'preparing')}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
            >
              Preparing
            </button>
          )}
          
          {order.status !== 'ready' && (
            <button 
              onClick={() => onStatusChange(order.id, 'ready')}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
            >
              Ready
            </button>
          )}
          
          {order.status !== 'delivered' && (
            <button 
              onClick={() => onStatusChange(order.id, 'delivered')}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm"
            >
              Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import OrderCard from '../../components/management/OrderCard';
import { orders as initialOrders } from '../../data/orders';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';

const OrderManagement: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  
  useEffect(() => {
    if (user?.restaurantId) {
      const restaurantOrders = initialOrders.filter(
        order => order.restaurantId === user.restaurantId
      );
      setOrders(restaurantOrders);
      setFilteredOrders(restaurantOrders);
    }
  }, [user]);
  
  useEffect(() => {
    let result = orders;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.id.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);
  
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  
  return (
    <div className="bg-[#1c2756] rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-[#2a3563]">
        <h2 className="text-xl font-bold mb-4">Order Management</h2>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, phone, or order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
            />
          </div>
          
          <div className="relative w-full md:w-48">
            <Filter size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
              className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff] appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-[#2a3563] rounded-lg">
            <p className="text-gray-400">
              {orders.length > 0 
                ? 'No orders match your search criteria.' 
                : 'No orders yet. When customers place orders, they will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
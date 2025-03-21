import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import ReservationCard from '../../components/management/ReservationCard';
import { reservations as initialReservations } from '../../data/reservations';
import { useAuth } from '../../context/AuthContext';
import { Reservation } from '../../types';

const ReservationManagement: React.FC = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Reservation['status'] | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('');
  
  useEffect(() => {
    if (user?.restaurantId) {
      const restaurantReservations = initialReservations.filter(
        reservation => reservation.restaurantId === user.restaurantId
      );
      setReservations(restaurantReservations);
      setFilteredReservations(restaurantReservations);
    }
  }, [user]);
  
  useEffect(() => {
    let result = reservations;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(reservation => 
        reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(reservation => reservation.status === statusFilter);
    }
    
    // Apply date filter
    if (dateFilter) {
      result = result.filter(reservation => reservation.date === dateFilter);
    }
    
    setFilteredReservations(result);
  }, [reservations, searchTerm, statusFilter, dateFilter]);
  
  const handleStatusChange = (reservationId: string, newStatus: Reservation['status']) => {
    setReservations(prevReservations => 
      prevReservations.map(reservation => 
        reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
      )
    );
  };
  
  return (
    <div className="bg-[#1c2756] rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-[#2a3563]">
        <h2 className="text-xl font-bold mb-4">Reservation Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
            />
          </div>
          
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Reservation['status'] | 'all')}
              className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff] appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="relative">
            <Calendar size={20} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {filteredReservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReservations.map(reservation => (
              <ReservationCard 
                key={reservation.id} 
                reservation={reservation} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-[#2a3563] rounded-lg">
            <p className="text-gray-400">
              {reservations.length > 0 
                ? 'No reservations match your search criteria.' 
                : 'No reservations yet. When customers make reservations, they will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationManagement;
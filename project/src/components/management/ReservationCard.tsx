import React from 'react';
import { Calendar, Clock, Users, Check, X } from 'lucide-react';
import { Reservation } from '../../types';

interface ReservationCardProps {
  reservation: Reservation;
  onStatusChange: (reservationId: string, status: Reservation['status']) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, 
  onStatusChange 
}) => {
  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-[#1c2756] rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-white">{reservation.name}</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(reservation.status)}`}>
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </div>
        </div>
        
        <div className="space-y-2 text-gray-300 mb-4">
          <p className="flex items-center">
            <Calendar size={16} className="mr-2 text-[#6c63ff]" />
            {reservation.date}
          </p>
          <p className="flex items-center">
            <Clock size={16} className="mr-2 text-[#6c63ff]" />
            {reservation.time}
          </p>
          <p className="flex items-center">
            <Users size={16} className="mr-2 text-[#6c63ff]" />
            {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}
          </p>
        </div>
        
        <div className="space-y-1 text-gray-300 mb-4">
          <p>Email: {reservation.email}</p>
          <p>Phone: {reservation.phone}</p>
        </div>
        
        <div className="flex space-x-2">
          {reservation.status !== 'confirmed' && (
            <button 
              onClick={() => onStatusChange(reservation.id, 'confirmed')}
              className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center"
            >
              <Check size={16} className="mr-1" />
              Confirm
            </button>
          )}
          
          {reservation.status !== 'cancelled' && (
            <button 
              onClick={() => onStatusChange(reservation.id, 'cancelled')}
              className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
          )}
          
          {reservation.status !== 'pending' && (
            <button 
              onClick={() => onStatusChange(reservation.id, 'pending')}
              className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center justify-center"
            >
              Reset to Pending
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
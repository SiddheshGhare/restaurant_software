import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

interface ReservationFormProps {
  restaurantId: string;
  onSubmit: (formData: ReservationFormData) => void;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ restaurantId, onSubmit }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Generate time slots from 11:00 to 22:00 with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      for (let minute of ['00', '30']) {
        if (hour === 22 && minute === '30') continue; // Skip 22:30
        const time = `${hour}:${minute}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <form onSubmit={handleSubmit} className="bg-[#1c2756] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Reserve a Table</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="date" className="block text-gray-300 mb-1">
              <Calendar size={16} className="inline mr-1" /> Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="time" className="block text-gray-300 mb-1">
              <Clock size={16} className="inline mr-1" /> Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="guests" className="block text-gray-300 mb-1">
            <Users size={16} className="inline mr-1" /> Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#2a3563] border border-[#3b4784] text-white focus:outline-none focus:border-[#6c63ff]"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        type="submit"
        className="w-full mt-6 py-3 bg-[#6c63ff] hover:bg-[#5a52d5] text-white font-medium rounded-md transition-colors"
      >
        Reserve Now
      </button>
    </form>
  );
};

export default ReservationForm;
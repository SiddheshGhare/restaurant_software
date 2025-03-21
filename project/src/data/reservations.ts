import { Reservation } from '../types';

export const reservations: Reservation[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    date: '2025-06-15',
    time: '19:00',
    guests: 2,
    status: 'confirmed'
  },
  {
    id: '2',
    restaurantId: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    date: '2025-06-16',
    time: '20:00',
    guests: 4,
    status: 'pending'
  },
  {
    id: '3',
    restaurantId: '2',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '555-456-7890',
    date: '2025-06-17',
    time: '18:30',
    guests: 3,
    status: 'confirmed'
  }
];
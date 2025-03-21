import { Order } from '../types';

export const orders: Order[] = [
  {
    id: '1',
    restaurantId: '1',
    items: [
      {
        id: '1-1-1',
        name: 'vadapav',
        description: 'Crispy pastry filled with spiced potatoes and peas',
        price: 290,
       image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
        available: true,
        quantity: 2
      },
      {
        id: '1-2-1',
        name: 'Butter Chicken',
        description: 'Tender chicken in a rich tomato and butter sauce',
        price: 300,
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
        available: true,
        quantity: 1
      }
    ],
    total: 320,
    status: 'preparing',
    paymentMethod: 'card',
    customerName: 'Siddhesh',
    customerPhone: '7276346972',
    createdAt: '2025-06-15T19:30:00Z'
  },
  {
    id: '2',
    restaurantId: '2',
    items: [
      {
        id: '2-1-1',
        name: 'Calamari',
        description: 'Crispy fried calamari with lemon aioli',
        price: 200,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
        available: true,
        quantity: 1
      },
      {
        id: '2-2-1',
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter sauce',
        price: 400,
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
        available: true,
        quantity: 2
      }
    ],
    total: 47.97,
    status: 'pending',
    paymentMethod: 'cash',
    customerName: 'Jane Smith',
    customerPhone: '555-987-6543',
    createdAt: '2025-06-15T20:15:00Z'
  }
];
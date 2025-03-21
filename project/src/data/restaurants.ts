import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Garden',
    introduction: 'Authentic Indian cuisine with a modern twist',
    openingTime: '11:00',
    closingTime: '22:00',
    location: '123 Main St, New York, NY',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    rating: 4.5,
    categories: [
      {
        id: '1-1',
        name: 'Appetizers',
        items: [
          {
            id: '1-1-1',
            name: 'Samosas',
            description: 'Crispy pastry filled with spiced potatoes and peas',
            price: 20,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            available: true
          },
          {
            id: '1-1-2',
            name: 'Paneer Tikka',
            description: 'Marinated cottage cheese grilled to perfection',
            price: 300,
            image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            available: true
          }
        ]
      },
      {
        id: '1-2',
        name: 'Main Course',
        items: [
          {
            id: '1-2-1',
            name: 'Butter Chicken',
            description: 'Tender chicken in a rich tomato and butter sauce',
            price: 500,
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            available: true
          },
          {
            id: '1-2-2',
            name: 'Vegetable Biryani',
            description: 'Fragrant rice dish with mixed vegetables and spices',
            price: 900,
            image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            available: true
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    introduction: 'Fresh seafood and coastal cuisine',
    openingTime: '12:00',
    closingTime: '23:00',
    location: '456 Ocean Ave, Miami, FL',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    rating: 4.7,
    categories: [
      {
        id: '2-1',
        name: 'Starters',
        items: [
          {
            id: '2-1-1',
            name: 'Calamari',
            description: 'Crispy fried calamari with lemon aioli',
            price: 400,
            image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80',
            available: true
          },
          {
            id: '2-1-2',
            name: 'Shrimp Cocktail',
            description: 'Chilled shrimp with cocktail sauce',
            price: 1000,
            image: 'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            available: true
          }
        ]
      },
      {
        id: '2-2',
        name: 'Seafood',
        items: [
          {
            id: '2-2-1',
            name: 'Grilled Salmon',
            description: 'Atlantic salmon with lemon butter sauce',
            price: 2000,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            available: true
          },
          {
            id: '2-2-2',
            name: 'Lobster Tail',
            description: 'Broiled lobster tail with drawn butter',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1559742811-822873691df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            available: true
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Bella Italia',
    introduction: 'Traditional Italian dishes made with love',
    openingTime: '11:30',
    closingTime: '22:30',
    location: '789 Pasta Lane, Chicago, IL',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    rating: 4.6,
    categories: [
      {
        id: '3-1',
        name: 'Pasta',
        items: [
          {
            id: '3-1-1',
            name: 'Spaghetti Carbonara',
            description: 'Classic carbonara with pancetta and egg',
            price: 90,
            image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
            available: true
          },
          {
            id: '3-1-2',
            name: 'Fettuccine Alfredo',
            description: 'Creamy alfredo sauce with fettuccine pasta',
            price: 50,
            image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            available: true
          }
        ]
      },
      {
        id: '3-2',
        name: 'Pizza',
        items: [
          {
            id: '3-2-1',
            name: 'Margherita',
            description: 'Classic pizza with tomato, mozzarella, and basil',
            price: 300,
            image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            available: true
          },
          {
            id: '3-2-2',
            name: 'Pepperoni',
            description: 'Pepperoni pizza with mozzarella cheese',
            price: 600,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
            available: true
          }
        ]
      }
    ]
  }
];
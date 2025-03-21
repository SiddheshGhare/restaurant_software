export interface Restaurant {
  id: string;
  name: string;
  introduction: string;
  openingTime: string;
  closingTime: string;
  location: string;
  image: string;
  rating: number;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Order {
  id: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  paymentMethod: 'card' | 'cash';
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
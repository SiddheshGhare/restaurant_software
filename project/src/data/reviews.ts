import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    restaurantId: '1',
    userName: 'John D.',
    rating: 5,
    comment: 'Amazing food and great service! The butter chicken was delicious.',
    date: '2025-05-20'
  },
  {
    id: '2',
    restaurantId: '1',
    userName: 'Sarah M.',
    rating: 4,
    comment: 'Loved the food but the wait was a bit long. Will definitely come back though!',
    date: '2025-05-15'
  },
  {
    id: '3',
    restaurantId: '2',
    userName: 'Mike J.',
    rating: 5,
    comment: 'The seafood was incredibly fresh. Best lobster I\'ve had in years!',
    date: '2025-05-18'
  },
  {
    id: '4',
    restaurantId: '3',
    userName: 'Lisa K.',
    rating: 4,
    comment: 'Authentic Italian flavors. The pasta was cooked to perfection.',
    date: '2025-05-22'
  }
];
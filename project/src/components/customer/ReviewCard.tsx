import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-[#1c2756] p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{review.userName}</h3>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < review.rating ? "text-yellow-300" : "text-gray-600"} 
              fill={i < review.rating ? "#fcd34d" : "none"}
            />
          ))}
        </div>
      </div>
      
      <p className="text-gray-300 mb-2">{review.comment}</p>
      
      <p className="text-gray-400 text-sm">{review.date}</p>
    </div>
  );
};

export default ReviewCard;
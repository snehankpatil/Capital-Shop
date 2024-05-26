// StarRating.js
import React from 'react';
// import './StarRating.css';

const StarRating = ({ rating }) => {
  // Ensure rating is between 0 and 5
  const validRating = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;

  return (
    <div className="star-rating bg-white ">
      {Array.from({ length: 5 }, (v, i) => {
        if (i < fullStars) {
          return <span key={i} className="star full">★</span>;
        } else if (i === fullStars && hasHalfStar) {
          return <span key={i} className="star half">★</span>;
        } else {
          return <span key={i} className="star empty">☆</span>;
        }
      })}
    </div>
  );
};

export default StarRating;

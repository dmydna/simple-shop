import React from 'react';
import Rating from 'react-stars';

function StarRating({ value, onChange }) {
  return (
    <Rating
      count={5}
      value={value}
      onChange={onChange}
      size={24}
      color1="#ddd"
      color2="#ffd700"
      edit={true}
    />
  );
}

export default StarRating;

import Rating from 'react-stars';

function StarRating({ value, onChange, edit=false, size=24 }) {
  return (
    <Rating
      count={5}
      value={value}
      onChange={onChange}
      size={size}
      color1="#ddd"
      color2="#FF9800"
      edit={onChange ? true:false}
    />
  );
}

export default StarRating;

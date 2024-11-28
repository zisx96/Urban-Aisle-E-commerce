import React, { useState } from 'react';
import SvgFavourite from '../../Components/common/SvgFavourite';

const ProductCard = ({ title, description, price, brand, thumbnail }) => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleFill = () => setIsFilled(!isFilled);

  return (
    <div className="flex flex-col hover:scale-105 relative group">
      {/* Card Thumbnail */}
      <img
        className="h-[320px] w-[280px] bg-cover bg-center border rounded-lg cursor-pointer object-cover block"
        src={thumbnail}
        alt={title}
      />

      {/* Card Content */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col pt-2">
          <p className="text-[16px] p-2">{title}</p>
          {description && <p className="text-[12px] px-2 text-gray-600">{brand} Brand</p>}
        </div>
        <div>
          <p>${price}</p>
        </div>
      </div>

      {/* Favourite Button */}
      <button
        onClick={toggleFill}
        className="absolute top-0 right-0 pt-4 pr-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <SvgFavourite isFilled={isFilled} />
      </button>
    </div>
  );
};

export default ProductCard;

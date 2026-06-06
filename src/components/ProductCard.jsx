import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

export const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('uz-UZ') + " som";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 relative flex flex-col justify-between shadow-sm hover:shadow-md transition">
      <div>
        <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10">
          {product.title}
        </h3>
        <div className="text-xs text-amber-500 mb-2">{product.rating}</div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col">
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-base font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>
        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
          <FiShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};
import React from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }) => {
  const { cart, addToCart, isAdding } = useCart();


  const isInCart = cart.some((item) => item.productId === product.id);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition p-4">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover rounded-lg"
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800">{product.title}</h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-blue-600">
            {product.price.toLocaleString()} som
          </span>

          <button
            onClick={() => addToCart(product)}
            disabled={isInCart || isAdding}
            className={`p-2 rounded-lg text-white transition-colors ${
              isInCart 
                ? "bg-green-500 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            }`}
          >
            {isInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
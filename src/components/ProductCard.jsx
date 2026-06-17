import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart, isAdding } = useCart();

  // Savat ichidan aynan shu mahsulotni qidiramiz (== belgi turi farq qilsa ham topadi)
  const cartItem = cart.find((item) => item.productId == product.id);

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

          {/* Agar mahsulot savatda bo'lsa, + va - tugmalari chiqadi */}
          {cartItem ? (
            <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50 shadow-sm">
              <button
                onClick={() => {
                  const joriySoni = cartItem.quantity || 1;
                  if (joriySoni > 1) {
                    updateQuantity(cartItem.id, joriySoni - 1);
                  } else {
                    removeFromCart(cartItem.id);
                  }
                }}
                disabled={isAdding}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 select-none"
              >
                -
              </button>
              
              {/* Soni ko'rinadigan joy. Agar quantity bo'sh bo'lsa, 1 ni ko'rsatadi */}
              <span className="px-4 font-bold text-gray-800 min-w-[30px] text-center">
                {cartItem.quantity || 1}
              </span>
              
              <button
                onClick={() => {
                  const joriySoni = cartItem.quantity || 1;
                  updateQuantity(cartItem.id, joriySoni + 1);
                }}
                disabled={isAdding}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 select-none"
              >
                +
              </button>
            </div>
          ) : (
            /* Agar mahsulot savatda bo'lmasa, oddiy ko'k tugma */
            <button
              onClick={() => addToCart(product)}
              disabled={isAdding}
              className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
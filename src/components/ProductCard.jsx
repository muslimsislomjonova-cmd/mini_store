

import React from 'react';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import { useCartQuery, useAddToCart, useUpdateQty, useRemoveFromCart } from '../hooks/useCart';

export const ProductCard = ({ product }) => {
  const { data: cartItems = [] } = useCartQuery();
  const cartItem = cartItems.find((i) => i.productId === product.id);

  const addToCart = useAddToCart();
  const updateQty = useUpdateQty();
  const removeFromCart = useRemoveFromCart();

  const isLoading = addToCart.isPending || updateQty.isPending || removeFromCart.isPending;

  const handleAdd = () => {
    addToCart.mutate({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  const handleIncrease = () => {
    updateQty.mutate({ cartItemId: cartItem.id, newQty: cartItem.quantity + 1 });
  };

  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart.mutate(cartItem.id);
    } else {
      updateQty.mutate({ cartItemId: cartItem.id, newQty: cartItem.quantity - 1 });
    }
  };

  const formatPrice = (price) => price.toLocaleString('uz-UZ') + ' som';

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition">

    
      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              Mavjud emas
            </span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10">
        {product.title}
      </h3>
      <div className="text-xs text-amber-500 mb-2"> {product.rating}</div>


      <div className="flex items-center justify-between mt-2">
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

      
        {!product.inStock && (
          <button disabled className="p-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
            <FiShoppingCart size={18} />
          </button>
        )}

   
        {product.inStock && !cartItem && (
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition disabled:opacity-50"
          >
            {addToCart.isPending
              ? <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin inline-block" />
              : <FiShoppingCart size={18} />
            }
          </button>
        )}

        {product.inStock && cartItem && (
          <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden">
            <button
              onClick={handleDecrease}
              disabled={isLoading}
              className="px-2 py-1.5 text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
            >
              <FiMinus size={14} />
            </button>
            <span className="px-2 text-sm font-semibold text-gray-800">
              {cartItem.quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={isLoading}
              className="px-2 py-1.5 text-blue-600 hover:bg-blue-50 transition disabled:opacity-50"
            >
              <FiPlus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
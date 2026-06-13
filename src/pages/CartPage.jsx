import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const CartPage = () => {
  const { cart, isLoading, isError, removeFromCart, refetch } = useCart();


  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (isLoading) return <p className="text-center p-10">Yuklanmoqda...</p>;
  
  if (isError) {
    return (
      <div className="text-center p-10">
        <p className="text-red-500 mb-2">Xatolik yuz berdi!</p>
        <button onClick={() => refetch()} className="bg-blue-600 text-white px-4 py-2 rounded">Qayta urinish</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-bold">Savat bosh</h2>
        <Link to="/" className="text-blue-500 underline mt-2 inline-block">Xarid qilish</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Savat sahifasi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded-xl flex items-center justify-between bg-white shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-blue-600 font-bold">{item.price.toLocaleString()} som</p>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-red-500 border border-red-200 px-3 py-1 rounded hover:bg-red-50"
              >
                Ochirish
              </button>
            </div>
          ))}
        </div>

     
        <div className="border p-6 rounded-xl bg-gray-50 h-fit space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Buyurtma tafsiloti</h2>
          <div className="flex justify-between">
            <span>Tovarlar soni:</span>
            <span className="font-bold">{cart.length} ta</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Jami:</span>
            <span className="text-blue-600">{totalPrice.toLocaleString()} som</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">Buyurtma berish</button>
        </div>
      </div>
    </div>
  );
};
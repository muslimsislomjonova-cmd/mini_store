
import React, { useState } from 'react';
import { HeroSwiper } from '../components/HeroSwiper';
import { Categories } from '../components/Categories';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { useProducts } from '../hooks/useProducts';

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: products, isLoading, error } = useProducts(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
     
        <HeroSwiper />
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <main className="max-w-7xl mx-auto px-4 my-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            {selectedCategory ? 'Kategoriya mahsulotlari' : 'Barcha mahsulotlar'}
          </h2>

          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 bg-gray-200 rounded mt-3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">
              Xato: {error.message}
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};
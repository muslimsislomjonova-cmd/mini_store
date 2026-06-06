import React from 'react';
import { useCategories } from '../hooks/useCategories';

const categoryIcons = {
  'beauty': '',
  'fragrances': '',
  'furniture': '',
  'groceries': '',
  'home-decoration': '',
  'kitchen-accessories': '',
  'laptops': '',
  'mens-shirts': '',
  'mens-shoes': '',
  'mens-watches': '',
  'mobile-accessories': '',
  'motorcycle': '',
  'skin-care': '',
  'smartphones': '',
  'sports-accessories': '',
  'sunglasses': '',
  'tablets': '',
  'tops': '',
  'vehicle': '',
  'womens-bags': '',
  'womens-jewellery': '',
  'womens-shoes': '',
  'womens-watches': '',
};

export const Categories = ({ selectedCategory, onSelectCategory }) => {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 my-8 h-16 bg-gray-100 animate-pulse rounded-xl"></div>
    );
  }

  if (error) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Kategoriyalar</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">

        <button
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 border rounded-full font-medium text-sm transition ${
            selectedCategory === null
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 hover:border-blue-400'
          }`}
        >
           Barchasi
        </button>

        {categories?.map((cat, index) => (
          <button
            key={cat.slug || index}
            onClick={() => onSelectCategory(cat.slug)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 border rounded-full font-medium text-sm transition ${
              selectedCategory === cat.slug
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:border-blue-400'
            }`}
          >
            <span>{categoryIcons[cat.slug]}</span>
            <span>{cat.name}</span>
          </button>
        ))}

      </div>
    </div>
  );
};
// src/components/Categories.jsx

import React from 'react';
import { useCategories } from '../hooks/useCategories';

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

 
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 border rounded-full font-medium text-sm transition ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:border-blue-400'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}

      </div>
    </div>
  );
};
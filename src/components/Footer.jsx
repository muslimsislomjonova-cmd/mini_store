

import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16 py-8 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <p className="mb-2 text-white font-bold text-lg">MiniStore</p>
        <p>&copy; {new Date().getFullYear()} MiniStore</p>
      </div>
    </footer>
  );
};

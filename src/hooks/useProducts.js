// src/hooks/useProducts.js

import { useQuery } from '@tanstack/react-query';

export function useProducts(selectedCategoryId) {
  return useQuery({
    queryKey: ['products', selectedCategoryId],
    queryFn: async () => {

      const url = selectedCategoryId
        ? `http://localhost:3001/products?categoryId=${selectedCategoryId}`
        : `http://localhost:3001/products`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Mahsulotlar yuklanmadi');
      return res.json();
    },
  });
}
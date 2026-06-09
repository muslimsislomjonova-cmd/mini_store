// src/hooks/useCategories.js

import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/categories');
      if (!res.ok) throw new Error('Kategoriyalar yuklanmadi');
      return res.json();
    },
  });
}
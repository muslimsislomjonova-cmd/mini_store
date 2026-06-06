import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      return data;
    },
  });
}
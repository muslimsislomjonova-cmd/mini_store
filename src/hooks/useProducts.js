import { useQuery } from '@tanstack/react-query';

export function useProducts(selectedCategory) {
  return useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory
        ? `https://dummyjson.com/products/category/${selectedCategory}?limit=20`
        : `https://dummyjson.com/products?limit=20`;

      const res = await fetch(url);
      const data = await res.json();
      return data.products;
    },
  });
}
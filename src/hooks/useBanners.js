import { useQuery } from '@tanstack/react-query';

export function useBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await fetch('https://dummyjson.com/products?limit=5');
      const data = await res.json();
      return data.products;
    },
  });
}
// src/hooks/useCategories.js
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/apiClient'; 

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {

      const response = await apiClient.get('/categories');
      return response.data;
    },
  });
}
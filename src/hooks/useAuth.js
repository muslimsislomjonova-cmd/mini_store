import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/apiClient';

export const useCurrentUser = () => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    },
    enabled: !!token && !!userId, 
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/login', credentials);
      return response.data; 
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);

      localStorage.setItem('refreshToken', 'fake-refresh-token-7-days');
      localStorage.setItem('userId', data.user.id);
      
    
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};


export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/register', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', 'fake-refresh-token-7-days');
      localStorage.setItem('userId', data.user.id);
      
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};

    export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    queryClient.clear();
    window.location.href = '/login';
  };

  return logout;
};
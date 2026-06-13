
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

export const useCart = () => {
  const queryClient = useQueryClient();


  const { data: cart = [], isError, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await apiClient.get("/cart");
      return response.data;
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (product) => {
      const response = await apiClient.post("/cart", {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`/cart/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]); 
    },
  });

  const handleAddToCart = (product) => {

    const allaqachonBor = cart.find((item) => item.productId === product.id);

  
    if (allaqachonBor) {
      return; 
    }

    addToCartMutation.mutate(product);
  };

  return {
    cart,
    isError,
    refetch,
    addToCart: handleAddToCart, 
    removeFromCart: removeFromCartMutation.mutate,
    isLoading: false, 
    isAdding: false, 
  };
};
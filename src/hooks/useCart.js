import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

export const useCart = () => {
  const queryClient = useQueryClient();

  // 1. Serverdan savatni yuklab olish
  const { data: cart = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await apiClient.get("/cart");
      return response.data;
    },
  });

  // 2. Yangi mahsulot qo'shish mutation
  const addToCartMutation = useMutation({
    mutationFn: async (product) => {
      const response = await apiClient.post("/cart", {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1, // Birinchi marta qo'shilganda 1 ta bo'ladi
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // 3. Bor mahsulotning sonini o'zgartirish mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }) => {
      const response = await apiClient.patch(`/cart/${id}`, { quantity });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // 4. Mahsulotni savatdan o'chirish mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`/cart/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]); 
    },
  });

  // Asosiy qo'shish funksiyasi (Karta bosilganda ishlaydi)
  const handleAddToCart = (product) => {
    // Savatda bu mahsulot bor-yo'qligini tekshiramiz (== ishlatdik, xatolik bermasligi uchun)
    const allaqachonBor = cart.find((item) => item.productId == product.id);

    if (allaqachonBor) {
      // Agar bo'lsa, joriy soniga 1 ni qo'shib yangilaymiz (1, 2, 3... bo'lib sanaydi)
      updateQuantityMutation.mutate({
        id: allaqachonBor.id,
        quantity: allaqachonBor.quantity + 1,
      });
    } else {
      // Agar savatda umuman yo'q bo'lsa, yangi qilib qo'shadi
      addToCartMutation.mutate(product);
    }
  };

  // Plyus va minus tugmalari uchun maxsus funksiya
  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantityMutation.mutate({ id, quantity: newQuantity });
  };

  return {
    cart,
    isLoading,
    isError,
    refetch,
    addToCart: handleAddToCart, 
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: handleUpdateQuantity,
    isAdding: addToCartMutation.isPending || updateQuantityMutation.isPending, 
  };
};
// src/hooks/useCart.js
// Cart uchun barcha React Query hooklari

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:3001';

// ─── 1. GET /cart ─────────────────────────────────────────────────────────
export function useCartQuery() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/cart`);
      if (!res.ok) throw new Error("Savat yuklanmadi");
      return res.json();
    },
    staleTime: 0,
  });
}

// ─── 2. Savatga qo'shish (POST yoki PATCH) ────────────────────────────────
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product) => {
      const cartRes = await fetch(`${API_URL}/cart`);
      const cart = await cartRes.json();
      const existing = cart.find((item) => item.productId === product.productId);

      if (existing) {
        // Allaqachon bor — quantity oshiramiz
        const res = await fetch(`${API_URL}/cart/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: existing.quantity + 1 }),
        });
        if (!res.ok) throw new Error("Yangilashda xato");
        return res.json();
      } else {
        // Yangi item
        const res = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, quantity: 1 }),
        });
        if (!res.ok) throw new Error("Qo'shishda xato");
        return res.json();
      }
    },

    onMutate: async (product) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const snapshot = queryClient.getQueryData(['cart']);

      queryClient.setQueryData(['cart'], (old = []) => {
        const existing = old.find((i) => i.productId === product.productId);
        if (existing) {
          return old.map((i) =>
            i.productId === product.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...old, { ...product, id: -1, quantity: 1 }];
      });

      return { snapshot };
    },

    onError: (_err, _product, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(['cart'], context.snapshot);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// ─── 3. DELETE /cart/:id ──────────────────────────────────────────────────
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId) => {
      const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error("O'chirishda xato");
    },

    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const snapshot = queryClient.getQueryData(['cart']);
      queryClient.setQueryData(['cart'], (old = []) =>
        old.filter((i) => i.id !== cartItemId)
      );
      return { snapshot };
    },

    onError: (_err, _id, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(['cart'], context.snapshot);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// ─── 4. PATCH /cart/:id — miqdor o'zgartirish ────────────────────────────
export function useUpdateQty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, newQty }) => {
      if (newQty === 0) {
        const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error("O'chirishda xato");
        return;
      }
      const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty }),
      });
      if (!res.ok) throw new Error("Yangilashda xato");
      return res.json();
    },

    onMutate: async ({ cartItemId, newQty }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const snapshot = queryClient.getQueryData(['cart']);
      queryClient.setQueryData(['cart'], (old = []) => {
        if (newQty === 0) return old.filter((i) => i.id !== cartItemId);
        return old.map((i) =>
          i.id === cartItemId ? { ...i, quantity: newQty } : i
        );
      });
      return { snapshot };
    },

    onError: (_err, _vars, context) => {
      if (context?.snapshot) {
        queryClient.setQueryData(['cart'], context.snapshot);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export const useProducts = (categoryId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true); 


    const url = categoryId
      ? `/products?categoryId=${categoryId}`
      : `/products`;

    apiClient
      .get(url)
      .then((res) => {
        setData(res.data); 
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Xatolik yuz berdi");
        setIsLoading(false);
      });
  }, [categoryId]);

  return { data, isLoading, error };
};
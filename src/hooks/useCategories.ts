"use client";

import { useEffect } from "react";
import { useProductStore } from "@/stores/productStore";

export function useCategories() {
  const store = useProductStore();

  useEffect(() => {
    void store.loadCategories();
  }, []);

  return {
    categories: store.categories,
    loading: store.loading.catalog,
    error: store.error,
  };
}
"use client";

import { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilterStore } from "@/stores/filterStore";
import { useProductStore } from "@/stores/productStore";
import { ProductCategory } from "@/types";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";

export function useProducts() {
  const store = useProductStore();
  const filters = useFilterStore();
  const debouncedQuery = useDebounce(store.searchQuery, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    void store.initializeCatalog();
  }, []);

  useEffect(() => {
    void store.searchProducts(debouncedQuery);
  }, [debouncedQuery]);

  const data = store.searchQuery.trim() ? store.searchResults : store.products;
  const filteredData = store.searchQuery.trim() ? data : store.getFilteredProducts(filters);

  return {
    data: filteredData,
    loading: store.loading.catalog || store.loading.search,
    error: store.error,
    categories: store.categories,
    products: store.products,
    searchResults: store.searchResults,
    initialized: store.initialized,
    refreshCatalog: store.refreshCatalog,
    searchProducts: store.searchProducts,
  };
}

export function useProductsByCategory(category: ProductCategory) {
  const store = useProductStore();

  useEffect(() => {
    void store.initializeCatalog();
  }, []);

  return {
    data: store.getProductsByCategory(category),
    loading: store.loading.catalog,
    error: store.error,
  };
}

export function useProductById(id: string) {
  const store = useProductStore();

  useEffect(() => {
    void store.selectProduct(id);
  }, [id]);

  return {
    data: store.selectedProduct?.id === id ? store.selectedProduct : store.getProductById(id) ?? null,
    reviews: store.selectedProduct?.id === id ? store.selectedProductReviews : [],
    loading: store.loading.details || store.loading.reviews,
    error: store.error,
  };
}

export function useBestsellers() {
  const store = useProductStore();

  useEffect(() => {
    void store.initializeCatalog();
  }, []);

  return {
    data: store.getBestSelling(),
    loading: store.loading.catalog,
    error: store.error,
  };
}

export function useSearchProducts(query: string) {
  const store = useProductStore();
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    void store.searchProducts(debouncedQuery);
  }, [debouncedQuery]);

  return {
    data: debouncedQuery.trim() ? store.searchResults : [],
    loading: store.loading.search,
    error: store.error,
  };
}
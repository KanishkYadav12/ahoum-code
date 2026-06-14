import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_RECENT_SEARCHES } from "@/lib/constants";
import { allProducts, type Product } from "@/data/searchData";

interface SearchStore {
  query: string;
  results: Product[];
  selectedProductId: number | null;
  isLoading: boolean;
  activeCategoryIds: number[];
  activeBrandIds: number[];
  recentSearches: string[];
  searching: boolean;

  setQuery: (q: string) => void;
  setSelectedProduct: (id: number) => void;
  applyFilters: (categoryIds: number[], brandIds: number[]) => void;
  clearSearch: () => void;
  fetchProducts: () => void;
  clearQuery: () => void;
  addRecentSearch: (q: string) => void;
  removeRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;
  setSearching: (searching: boolean) => void;
}

let searchTimer: ReturnType<typeof setTimeout> | null = null;
let loadTimer: ReturnType<typeof setTimeout> | null = null;

const filterProducts = (query: string, categoryIds: number[], brandIds: number[]): Product[] => {
  const normalized = query.trim().toLowerCase();
  return allProducts.filter((product) => {
	  const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized);
	  const matchesCategory = categoryIds.length === 0 || categoryIds.includes(product.categoryId);
	  const matchesBrand = brandIds.length === 0 || brandIds.includes(product.brandId);
	  return matchesQuery && matchesCategory && matchesBrand;
  });
};

const resetTimers = (): void => {
  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }

  if (loadTimer) {
    clearTimeout(loadTimer);
    loadTimer = null;
  }
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      query: "Egg",
      results: [],
      selectedProductId: null,
      isLoading: false,
      activeCategoryIds: [1],
      activeBrandIds: [2],
      recentSearches: [],
      searching: false,

      setQuery: (query) => {
        if (searchTimer) {
          clearTimeout(searchTimer);
        }

        set({ query, isLoading: true });
        searchTimer = setTimeout(() => {
          const state = get();
          const results = filterProducts(query, state.activeCategoryIds, state.activeBrandIds);
          set({
            results,
            selectedProductId: results[0]?.id ?? null,
            isLoading: false,
          });
        }, 300);
      },

      setSelectedProduct: (id) => set({ selectedProductId: id }),

		  applyFilters: (categoryIds, brandIds) => {
			const currentQuery = get().query;
			set({ activeCategoryIds: categoryIds, activeBrandIds: brandIds, isLoading: true });
			searchTimer = setTimeout(() => {
				const results = filterProducts(currentQuery, categoryIds, brandIds);
				set({
					results,
					selectedProductId: results[0]?.id ?? null,
					isLoading: false,
				});
			}, 300);
		  },

      clearSearch: () => {
        resetTimers();
        set({
          query: "",
          results: allProducts,
          selectedProductId: null,
          isLoading: false,
          activeCategoryIds: [1],
          activeBrandIds: [2],
          searching: false,
        });
      },

      fetchProducts: () => {
        if (loadTimer) {
          clearTimeout(loadTimer);
        }

        set({ isLoading: true });
        loadTimer = setTimeout(() => {
          const currentQuery = get().query;
          const state = get();
          const results = filterProducts(currentQuery, state.activeCategoryIds, state.activeBrandIds);
          set({
            results,
            selectedProductId: results[0]?.id ?? null,
            isLoading: false,
          });
        }, 600);
      },

      clearQuery: () => {
        resetTimers();
        set({ query: "", results: [], selectedProductId: null, isLoading: false });
      },

      addRecentSearch: (q) => {
        const trimmed = q.trim();
        if (!trimmed) return;
        const current = get().recentSearches.filter((s) => s !== trimmed);
        set({ recentSearches: [trimmed, ...current].slice(0, MAX_RECENT_SEARCHES) });
      },

      removeRecentSearch: (q) =>
        set((s) => ({
          recentSearches: s.recentSearches.filter((r) => r !== q),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),

      setSearching: (searching) => set({ searching }),
    }),
    { name: "nectar-search" }
  )
);
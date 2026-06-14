import { create } from "zustand";
import { FilterState, ProductCategory, SortOption } from "@/types";

interface FilterStore extends FilterState {
  setCategories: (cats: ProductCategory[]) => void;
  toggleCategory: (cat: ProductCategory) => void;
  setBrands: (brands: string[]) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleOrganic: () => void;
  toggleInStock: () => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  activeFiltersCount: () => number;
}

const defaults: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 100],
  onlyOrganic: false,
  onlyInStock: false,
  sortBy: SortOption.Popularity,
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...defaults,

  setCategories: (categories) => set({ categories }),

  toggleCategory: (cat) => {
    const current = get().categories;
    const exists = current.includes(cat);
    set({
      categories: exists
        ? current.filter((c) => c !== cat)
        : [...current, cat],
    });
  },

  setBrands: (brands) => set({ brands }),

  toggleBrand: (brand) => {
    const current = get().brands;
    const exists = current.includes(brand);
    set({
      brands: exists
        ? current.filter((b) => b !== brand)
        : [...current, brand],
    });
  },

  setPriceRange: (priceRange) => set({ priceRange }),

  toggleOrganic: () => set((s) => ({ onlyOrganic: !s.onlyOrganic })),

  toggleInStock: () => set((s) => ({ onlyInStock: !s.onlyInStock })),

  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () => set(defaults),

  activeFiltersCount: () => {
    const s = get();
    let count = 0;
    count += s.categories.length;
    count += s.brands.length;
    if (s.onlyOrganic) count += 1;
    if (s.onlyInStock) count += 1;
    return count;
  },
}));
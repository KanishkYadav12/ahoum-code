import { create } from "zustand";
import { ProductCategory } from "@/types";

interface FilterStore {
	isFilterOpen: boolean;
	categories: ProductCategory[];
	brands: string[];
	openFilter: () => void;
	closeFilter: () => void;
	toggleCategory: (category: ProductCategory) => void;
	toggleBrand: (brand: string) => void;
	resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
	isFilterOpen: false,
	categories: [],
	brands: [],

	openFilter: () => set({ isFilterOpen: true }),
	closeFilter: () => set({ isFilterOpen: false }),

	toggleCategory: (category) =>
		set((state) => ({
			categories: state.categories.includes(category)
				? state.categories.filter((c) => c !== category)
				: [...state.categories, category],
		})),

	toggleBrand: (brand) =>
		set((state) => ({
			brands: state.brands.includes(brand)
				? state.brands.filter((b) => b !== brand)
				: [...state.brands, brand],
		})),

	resetFilters: () => set({ categories: [], brands: [] }),
}));
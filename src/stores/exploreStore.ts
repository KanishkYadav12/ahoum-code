import { create } from "zustand";
import { categories, type Category } from "@/data/categoriesData";

interface ExploreStore {
	categories: Category[];
	searchQuery: string;
	filteredCategories: Category[];
	isLoading: boolean;
	setSearchQuery: (query: string) => void;
	fetchCategories: () => void;
}

let loadingTimer: ReturnType<typeof setTimeout> | null = null;

export const useExploreStore = create<ExploreStore>((set, get) => ({
	categories: [],
	searchQuery: "",
	filteredCategories: [],
	isLoading: false,

	setSearchQuery: (query) => {
		const normalized = query.trim().toLowerCase();
		const source = get().categories;
		set({
			searchQuery: query,
			filteredCategories: normalized ? source.filter((category) => category.name.toLowerCase().includes(normalized)) : source,
		});
	},

	fetchCategories: () => {
		if (loadingTimer) clearTimeout(loadingTimer);
		set({ isLoading: true });
		loadingTimer = setTimeout(() => set({ categories, filteredCategories: categories, isLoading: false }), 600);
	},
}));

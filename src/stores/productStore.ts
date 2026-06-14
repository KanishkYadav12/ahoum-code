import { create } from "zustand";
import { api } from "@/lib/api";
import { applyFilters, extractBrands } from "@/lib/utils";
import { useSearchStore } from "@/stores/searchStore";
import { Category, FilterState, Product, ProductCategory, Review } from "@/types";

type ProductLoadingState = {
	catalog: boolean;
	search: boolean;
	details: boolean;
	reviews: boolean;
};

interface ProductStore {
	products: Product[];
	categories: Category[];
	searchQuery: string;
	searchResults: Product[];
	selectedProduct: Product | null;
	selectedProductReviews: Review[];
	loading: ProductLoadingState;
	error: string | null;
	initialized: boolean;
	lastUpdatedAt: string | null;

	initializeCatalog: () => Promise<void>;
	refreshCatalog: () => Promise<void>;
	loadProducts: () => Promise<void>;
	loadCategories: () => Promise<void>;
	setSearchQuery: (query: string) => void;
	clearSearch: () => void;
	searchProducts: (query?: string) => Promise<void>;
	selectProduct: (productId: string) => Promise<void>;
	clearSelectedProduct: () => void;
	getProductById: (productId: string) => Product | undefined;
	getProductsByCategory: (category: ProductCategory) => Product[];
	getFeaturedProducts: () => Product[];
	getBestsellers: () => Product[];
	getExclusiveDeals: () => Product[];
	getRelatedProducts: (productId: string) => Product[];
	getFilteredProducts: (filters: FilterState) => Product[];
	getBrands: () => string[];
}

const defaultLoading: ProductLoadingState = {
	catalog: false,
	search: false,
	details: false,
	reviews: false,
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: [],
	categories: [],
	searchQuery: "",
	searchResults: [],
	selectedProduct: null,
	selectedProductReviews: [],
	loading: defaultLoading,
	error: null,
	initialized: false,
	lastUpdatedAt: null,

	initializeCatalog: async () => {
		if (get().initialized && get().products.length > 0 && get().categories.length > 0) {
			return;
		}

		set((state) => ({ loading: { ...state.loading, catalog: true }, error: null }));

		const [productResponse, categoryResponse] = await Promise.all([
			api.products.getAll(),
			api.categories.getAll(),
		]);

		if (!productResponse.success) {
			set((state) => ({
				loading: { ...state.loading, catalog: false },
				error: productResponse.message ?? "Unable to load products.",
			}));
			return;
		}

		if (!categoryResponse.success) {
			set((state) => ({
				loading: { ...state.loading, catalog: false },
				error: categoryResponse.message ?? "Unable to load categories.",
				products: productResponse.data,
				initialized: true,
				lastUpdatedAt: new Date().toISOString(),
			}));
			return;
		}

		set((state) => ({
			products: productResponse.data,
			categories: categoryResponse.data,
			initialized: true,
			lastUpdatedAt: new Date().toISOString(),
			loading: { ...state.loading, catalog: false },
			error: null,
		}));
	},

	refreshCatalog: async () => {
		set((state) => ({ loading: { ...state.loading, catalog: true }, error: null }));

		const [productResponse, categoryResponse] = await Promise.all([
			api.products.getAll(),
			api.categories.getAll(),
		]);

		if (!productResponse.success || !categoryResponse.success) {
			set((state) => ({
				loading: { ...state.loading, catalog: false },
				error: productResponse.message ?? categoryResponse.message ?? "Unable to refresh catalog.",
			}));
			return;
		}

		set((state) => ({
			products: productResponse.data,
			categories: categoryResponse.data,
			initialized: true,
			lastUpdatedAt: new Date().toISOString(),
			loading: { ...state.loading, catalog: false },
		}));
	},

	loadProducts: async () => {
		set((state) => ({ loading: { ...state.loading, catalog: true }, error: null }));
		const response = await api.products.getAll();

		if (!response.success) {
			set((state) => ({
				loading: { ...state.loading, catalog: false },
				error: response.message ?? "Unable to load products.",
			}));
			return;
		}

		set((state) => ({
			products: response.data,
			initialized: true,
			lastUpdatedAt: new Date().toISOString(),
			loading: { ...state.loading, catalog: false },
			error: null,
		}));
	},

	loadCategories: async () => {
		set((state) => ({ loading: { ...state.loading, catalog: true }, error: null }));
		const response = await api.categories.getAll();

		if (!response.success) {
			set((state) => ({
				loading: { ...state.loading, catalog: false },
				error: response.message ?? "Unable to load categories.",
			}));
			return;
		}

		set((state) => ({
			categories: response.data,
			initialized: true,
			lastUpdatedAt: new Date().toISOString(),
			loading: { ...state.loading, catalog: false },
			error: null,
		}));
	},

	setSearchQuery: (query) => set({ searchQuery: query }),

	clearSearch: () => set({ searchQuery: "", searchResults: [] }),

	searchProducts: async (query) => {
		const searchTerm = (query ?? get().searchQuery).trim();
		const searchStore = useSearchStore.getState();
		searchStore.setQuery(searchTerm);
		searchStore.setSearching(true);
		set((state) => ({
			searchQuery: searchTerm,
			loading: { ...state.loading, search: true },
			error: null,
		}));

		if (!searchTerm) {
			set((state) => ({
				searchResults: [],
				loading: { ...state.loading, search: false },
			}));
			searchStore.setSearching(false);
			return;
		}

		const response = await api.products.search(searchTerm);
		if (!response.success) {
			set((state) => ({
				searchResults: [],
				loading: { ...state.loading, search: false },
				error: response.message ?? "Search failed.",
			}));
			searchStore.setSearching(false);
			return;
		}

		set((state) => ({
			searchResults: response.data,
			loading: { ...state.loading, search: false },
		}));
		searchStore.addRecentSearch(searchTerm);
		searchStore.setSearching(false);
	},

	selectProduct: async (productId) => {
		set((state) => ({
			loading: { ...state.loading, details: true, reviews: true },
			error: null,
			selectedProduct: null,
			selectedProductReviews: [],
		}));

		const [productResponse, reviewResponse] = await Promise.all([
			api.products.getById(productId),
			api.reviews.getByProductId(productId),
		]);

		if (!productResponse.success || !productResponse.data) {
			set((state) => ({
				loading: { ...state.loading, details: false, reviews: false },
				error: productResponse.message ?? "Product not found.",
			}));
			return;
		}

		set((state) => ({
			selectedProduct: productResponse.data,
			selectedProductReviews: reviewResponse.success ? reviewResponse.data : [],
			loading: { ...state.loading, details: false, reviews: false },
			error: reviewResponse.success ? null : reviewResponse.message ?? null,
		}));
	},

	clearSelectedProduct: () =>
		set({ selectedProduct: null, selectedProductReviews: [], error: null }),

	getProductById: (productId) => get().products.find((product) => product.id === productId),

	getProductsByCategory: (category) =>
		get().products.filter((product) => product.category === category),

	getFeaturedProducts: () =>
		get().products.filter((product) => product.isFeatured).slice(0, 6),

	getBestSelling: () => get().products.filter((product) => product.isBestSeller).slice(0, 6),

	getExclusiveOffers: () => get().products.filter((product) => product.isExclusiveOffer).slice(0, 6),

	fetchProducts: async () => {
		// Simulated network delay for product fetch
		await new Promise((r) => setTimeout(r, 600));
		return get().loadProducts();
	},

	getRelatedProducts: (productId) => {
		const current = get().getProductById(productId);
		if (!current) return [];

		return get()
			.products
			.filter((product) => product.id !== productId)
			.filter((product) => product.category === current.category || product.brand === current.brand)
			.slice(0, 8);
	},

	getFilteredProducts: (filters) => applyFilters(get().products, filters),

	getBrands: () => extractBrands(get().products),
}));

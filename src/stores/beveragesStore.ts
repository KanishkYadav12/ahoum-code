import { create } from "zustand";
import { useCartStore } from "@/stores/cartStore";
import { ProductCategory, type Product as AppProduct } from "@/types";
import { beverages, type Product } from "@/data/beveragesData";

interface CartEntry {
	product: Product;
	qty: number;
}

interface BeveragesStore {
	products: Product[];
	cart: CartEntry[];
	isLoading: boolean;
	fetchProducts: () => Promise<void>;
	addToCart: (product: Product) => void;
}

let loadTimer: ReturnType<typeof setTimeout> | null = null;

const toAppProduct = (product: Product): AppProduct => ({
	id: String(product.id),
	name: product.name,
	description: product.description,
	price: product.price,
	unit: product.description.split(",")[0] ?? product.description,
	category: ProductCategory.Beverages,
	image: product.image,
	rating: 0,
	reviewCount: 0,
	inStock: true,
	isOrganic: false,
	isBestSeller: false,
	tags: [],
});

export const useBeveragesStore = create<BeveragesStore>((set, get) => ({
	products: [],
	cart: [],
	isLoading: false,

	fetchProducts: async () => {
		if (loadTimer) {
			clearTimeout(loadTimer);
		}

		set({ isLoading: true });
		loadTimer = setTimeout(() => {
			set({ products: beverages, isLoading: false });
		}, 600);
	},

	addToCart: (product) => {
		set((state) => {
			const existing = state.cart.find((item) => item.product.id === product.id);
			const nextCart = existing
				? state.cart.map((item) => (item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item))
				: [...state.cart, { product, qty: 1 }];

			useCartStore.getState().addToCart(toAppProduct(product));

			return { cart: nextCart };
		});
	},
}));

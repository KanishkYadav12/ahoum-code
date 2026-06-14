import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { favouriteItems } from "@/data/favouritesData";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";

const favoriteProducts = favouriteItems
	.map((item) => products.find((product) => product.name === item.name))
	.filter((product): product is Product => product !== undefined);

interface FavouritesStore {
  items: Product[];
  lastUpdatedAt: string | null;

  toggle: (product: Product) => void;
  add: (product: Product) => void;
  remove: (productId: string) => void;
  isFavourite: (id: string) => boolean;
  addAllToCart: () => void;
  clear: () => void;
}

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      items: favoriteProducts,
      lastUpdatedAt: null,

      toggle: (product) => {
        const exists = get().items.some((p) => p.id === product.id);
        set((s) => ({
          items: exists
            ? s.items.filter((p) => p.id !== product.id)
            : [...s.items, product],
          lastUpdatedAt: new Date().toISOString(),
        }));
      },

      add: (product) =>
        set((s) => ({
          items: s.items.some((p) => p.id === product.id)
            ? s.items
            : [...s.items, product],
          lastUpdatedAt: new Date().toISOString(),
        })),

      remove: (productId) =>
        set((s) => ({
          items: s.items.filter((p) => p.id !== productId),
          lastUpdatedAt: new Date().toISOString(),
        })),

      isFavourite: (id) => get().items.some((p) => p.id === id),

      addAllToCart: () => {
		get().items.forEach((item) => useCartStore.getState().addToCart(item));
		set({ lastUpdatedAt: new Date().toISOString() });
	  },

      clear: () => set({ items: [], lastUpdatedAt: new Date().toISOString() }),
    }),
    { name: "nectar-favourites" }
  )
);
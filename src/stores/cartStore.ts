import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import { calcCartTotals } from "@/lib/utils";

interface CartStore {
  items: CartItem[];
  lastUpdatedAt: string | null;

  // Actions
  addToCart: (product: Product) => void;
  incrementQty: (productId: string) => void;
  decrementQty: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;

  // Derived (computed inline to stay reactive)
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  getTotal: () => number;
  getItemCount: () => number;
  getTotals: () => ReturnType<typeof calcCartTotals>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastUpdatedAt: null,

      addToCart: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            lastUpdatedAt: new Date().toISOString(),
          }));
        } else {
          set((s) => ({
            items: [...s.items, { product, quantity: 1 }],
            lastUpdatedAt: new Date().toISOString(),
          }));
        }
      },

      incrementQty: (productId) => {
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
          lastUpdatedAt: new Date().toISOString(),
        }));
      },

      decrementQty: (productId) => {
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 }
              : i
          ),
          lastUpdatedAt: new Date().toISOString(),
        }));
      },

      removeFromCart: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.product.id !== productId),
          lastUpdatedAt: new Date().toISOString(),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
          lastUpdatedAt: new Date().toISOString(),
        }));
      },

      clearCart: () => set({ items: [], lastUpdatedAt: new Date().toISOString() }),

      setCartItems: (items) => set({ items, lastUpdatedAt: new Date().toISOString() }),

      getItemQuantity: (productId) =>
        get().items.find((i) => i.product.id === productId)?.quantity ?? 0,

      isInCart: (productId) =>
        get().items.some((i) => i.product.id === productId),

      getTotal: () => get().getTotals().total,

      getItemCount: () => get().getTotals().itemCount,

      getTotals: () => calcCartTotals(get().items),
    }),
    { name: "nectar-cart" }
  )
);
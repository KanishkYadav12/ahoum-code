"use client";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types";

// Convenience hook — single import for all cart actions in a component
export function useCart(product?: Product) {
  const store = useCartStore();

  const quantity = product ? store.getItemQuantity(product.id) : 0;
  const inCart = product ? store.isInCart(product.id) : false;

  const add = () => {
    if (product) store.addToCart(product);
  };

  const remove = () => {
    if (product) store.removeFromCart(product.id);
  };

  const increment = () => {
    if (product) store.updateQuantity(product.id, quantity + 1);
  };

  const decrement = () => {
    if (product) store.updateQuantity(product.id, quantity - 1);
  };

  return {
    quantity,
    inCart,
    add,
    remove,
    increment,
    decrement,
    items: store.items,
    totals: store.getTotals(),
    clearCart: store.clearCart,
  };
}
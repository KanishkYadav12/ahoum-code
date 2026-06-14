import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderStatus, CartItem, Address } from "@/types";
import { calcCartTotals, estimatedDelivery } from "@/lib/utils";
import { api } from "@/lib/api";
import { DELIVERY_FEE } from "@/lib/constants";

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isPlacing: boolean;
  lastOrderStatus: OrderStatus | null;
  error: string | null;

  placeOrder: (items: CartItem[], address: Address, promoCode?: string | null, discount?: number) => Promise<boolean>;
  clearCurrentOrder: () => void;
  clearOrders: () => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isPlacing: false,
      lastOrderStatus: null,
      error: null,

      placeOrder: async (items, address, promoCode = null, discount = 0) => {
        set({ isPlacing: true, error: null });

        const response = await api.orders.place();
        const success = response.success;

        const totals = calcCartTotals(items);

        // apply discount to subtotal and total
        const appliedDiscount = discount ?? 0;
        const subtotal = totals.subtotal;
        const deliveryFee = totals.deliveryFee;
        const total = parseFloat(Math.max(subtotal - appliedDiscount + deliveryFee, 0).toFixed(2));

        const order: Order = {
          id: `ORD-${Date.now()}`,
          items,
          subtotal,
          deliveryFee,
          total,
          status: success ? OrderStatus.Confirmed : OrderStatus.Failed,
          address,
          createdAt: new Date().toISOString(),
          estimatedDelivery: estimatedDelivery(30),
          paymentMethod: "Cash on Delivery",
          promoCode,
          discount: appliedDiscount,
        };

        set((s) => ({
          isPlacing: false,
          currentOrder: order,
          lastOrderStatus: order.status,
          orders: success ? [order, ...s.orders] : s.orders,
          error: success ? null : response.message ?? "Order placement failed.",
        }));

        return success;
      },

      clearCurrentOrder: () => set({ currentOrder: null, error: null }),

      clearOrders: () => set({ orders: [], currentOrder: null, lastOrderStatus: null, error: null }),

      getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),
    }),
    { name: "nectar-orders" }
  )
);
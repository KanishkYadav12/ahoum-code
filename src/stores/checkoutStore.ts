import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import { useCartStore } from "@/stores/cartStore";
import { PROMO_CODES } from "@/lib/constants";
import { useToastStore } from "@/stores/toastStore";
import { useOrderStore } from "@/stores/orderStore";
import { useAuthStore } from "@/stores/authStore";
import { PromoCode } from "@/types";

interface CheckoutStore {
	isCheckoutOpen: boolean;
	isOrderFailed: boolean;
	deliveryMethod: string | null;
	paymentMethod: string | null;
	promoCode: string | null;
	discount: number;
	openCheckout: () => void;
	closeCheckout: () => void;
	setOrderFailed: (val: boolean) => void;
	setDeliveryMethod: (method: string) => void;
	setPaymentMethod: (method: string) => void;
	setPromoCode: (code: string) => void;
	setDiscount: (discount: number) => void;
	placeOrder: () => Promise<boolean>;
	retryOrder: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
	persist(
		(set, get) => ({
			isCheckoutOpen: false,
			isOrderFailed: false,
			deliveryMethod: null,
			paymentMethod: null,
			promoCode: null,
			discount: 0,

			openCheckout: () => set({ isCheckoutOpen: true }),
			closeCheckout: () => set({ isCheckoutOpen: false }),
			setOrderFailed: (val) => set({ isOrderFailed: val }),
			setDeliveryMethod: (method) => set({ deliveryMethod: method }),
			setPaymentMethod: (method) => set({ paymentMethod: method }),
			setPromoCode: (code) => {
				const trimmed = code ? code.trim().toUpperCase() : null;
				if (!trimmed) {
					set({ promoCode: null, discount: 0 });
					useToastStore.getState().info("Promo cleared");
					return;
				}

				const promo = (PROMO_CODES as readonly PromoCode[]).find((p) => p.code === trimmed);
				if (!promo) {
					useToastStore.getState().error("Invalid promo code.");
					set({ promoCode: null, discount: 0 });
					return;
				}

				const subtotal = useCartStore.getState().getTotal();
				if (subtotal < promo.minOrderValue) {
					useToastStore
						.getState()
						.error(`Promo requires minimum order of $${promo.minOrderValue}`);
					set({ promoCode: null, discount: 0 });
					return;
				}

				let discountAmt = 0;
				if (promo.type === "percentage") {
					discountAmt = (promo.value / 100) * subtotal;
					if (promo.maxDiscount) discountAmt = Math.min(discountAmt, promo.maxDiscount);
				} else if (promo.type === "flat") {
					discountAmt = promo.value;
				}

				discountAmt = parseFloat(discountAmt.toFixed(2));
				set({ promoCode: promo.code, discount: discountAmt });
				useToastStore.getState().success(`Applied promo ${promo.code}`);
			},
			setDiscount: (discount) => set({ discount }),
			placeOrder: async () => {
				const cartTotal = useCartStore.getState().getTotal();
				if (cartTotal <= 0) {
					useToastStore.getState().error("Your cart is empty.");
					return false;
				}

				await api.orders.place();

				const success = Math.random() > 0.2;

				if (!success) {
					set({ isCheckoutOpen: false, isOrderFailed: true });
					useToastStore.getState().error("Order placement failed. Please try again.");
					return false;
				}

				const items = useCartStore.getState().items;
				const address = useAuthStore.getState().user?.address ?? {
					id: "addr-guest",
					label: "Home",
					street: "",
					city: "",
					state: "",
					pincode: "",
				};

				useOrderStore.getState().placeOrder(items, address as any, get().promoCode, get().discount);

				useCartStore.getState().clearCart();
				set({
					isCheckoutOpen: false,
					isOrderFailed: false,
					deliveryMethod: null,
					paymentMethod: null,
					promoCode: null,
					discount: 0,
				});
				useToastStore.getState().success("Order placed successfully!");
				if (typeof window !== "undefined") {
					window.location.assign("/order-success");
				}
				return true;
			},
			retryOrder: () => set({ isOrderFailed: false, isCheckoutOpen: true }),
		}),
		{ name: "nectar-checkout" }
	)
);

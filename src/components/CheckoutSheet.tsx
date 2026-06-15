"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

interface CheckoutRowProps {
	label: string;
	children: ReactNode;
	onClick?: () => void;
}

function CheckoutRow({ label, children, onClick }: CheckoutRowProps) {
	const content = (
		<div className="flex h-14 items-center justify-between border-b border-[#E2E2E2] py-0">
			<span className="font-poppins text-[16px] font-normal text-[#7C7C7C]">{label}</span>
			<div className="flex items-center gap-1.5">{children}</div>
		</div>
	);

	if (onClick) {
		return (
			<button type="button" onClick={onClick} className="w-full text-left">
				{content}
			</button>
		);
	}

	return content;
}

function Chevron() {
	return <span className="text-[14px] leading-none text-[#181725]">›</span>;
}

function MastercardMark() {
	return (
		<div className="flex items-center">
			<span className="h-6 w-6 rounded-full bg-[#EB001B]" aria-hidden="true" />
			<span className="-ml-3 h-6 w-6 rounded-full bg-[#4D86FF] opacity-90" aria-hidden="true" />
		</div>
	);
}

export default function CheckoutSheet() {
	const router = useRouter();

	// ✅ ALL hooks at the top — before any conditional return
	const isCheckoutOpen = useCheckoutStore((state) => state.isCheckoutOpen);
	const closeCheckout = useCheckoutStore((state) => state.closeCheckout);
	const placeOrder = useCheckoutStore((state) => state.placeOrder);
	const deliveryMethod = useCheckoutStore((state) => state.deliveryMethod);
	const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
	const discount = useCheckoutStore((state) => state.discount);
	const promoCode = useCheckoutStore((state) => state.promoCode); // ✅ moved out of JSX
	const getTotals = useCartStore((state) => state.getTotals);

	const [promoOpen, setPromoOpen] = useState(false); // ✅ moved above early return
	const [promoInput, setPromoInput] = useState("");   // ✅ moved above early return

	const totals = getTotals();
	const subtotal = totals.subtotal;
	const deliveryFee = totals.deliveryFee;
	const total = Math.max(subtotal - discount + deliveryFee, 0);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeCheckout();
			}
		};

		if (isCheckoutOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [closeCheckout, isCheckoutOpen]);

	// ✅ Conditional return AFTER all hooks
	if (!isCheckoutOpen) {
		return null;
	}

	const applyPromo = () => {
		if (!promoInput.trim()) return;
		useCheckoutStore.getState().setPromoCode(promoInput.trim());
		setPromoOpen(false);
	};

	const handlePlaceOrder = () => {
		void placeOrder().then((success) => {
    if (success) {
        router.push("/checkout/success");
    } else {
        router.push("/checkout/failure");
    }
});
	};

	return (
		<div className="fixed inset-0 z-[60] bg-black/30">
			<button type="button" aria-label="Close checkout" onClick={closeCheckout} className="absolute inset-0 h-full w-full cursor-default" />

			<div className="fixed bottom-0 left-0 right-0 z-[61] max-h-[calc(100vh-32px)] overflow-hidden rounded-t-[30px] bg-white px-[25px] py-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 md:left-1/2 md:top-1/2 md:bottom-auto md:w-[520px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[30px] md:px-8 md:py-8">
				<div className="flex max-h-[calc(100vh-80px)] flex-col">
					<div className="mb-6 flex items-center justify-between">
						<h2 className="font-poppins text-[22px] font-bold text-[#181725]">Checkout</h2>
						<button type="button" onClick={closeCheckout} className="flex h-5 w-5 items-center justify-center text-[#181725]" aria-label="Close checkout sheet">
							<span className="text-[20px] leading-none">✕</span>
						</button>
					</div>

					<div className="flex-1 overflow-y-auto pr-1">
						<CheckoutRow label="Delivery" onClick={() => undefined}>
							<span className="font-poppins text-[16px] font-semibold text-[#181725]">Select Method</span>
							<Chevron />
						</CheckoutRow>

						<CheckoutRow label="Payment" onClick={() => undefined}>
							<MastercardMark />
							<Chevron />
						</CheckoutRow>

						<CheckoutRow label="Promo Code" onClick={() => setPromoOpen((v) => !v)}>
							<span className="font-poppins text-[16px] font-semibold text-[#181725]">
								{promoCode ?? "Pick discount"}
							</span>
							<Chevron />
						</CheckoutRow>

						{promoOpen && (
							<div className="mt-3 flex flex-col gap-3">
								<div className="flex gap-2">
									<input
										value={promoInput}
										onChange={(e) => setPromoInput(e.target.value)}
										placeholder="Enter promo code"
										className="flex-1 rounded-lg border border-[#E8E8E8] px-3 py-2 font-poppins text-[14px]"
									/>
									<button type="button" onClick={applyPromo} className="rounded-lg bg-[#4CAF82] px-4 py-2 text-white">
										Apply
									</button>
								</div>
								<div className="flex flex-wrap gap-2">
									<button type="button" onClick={() => setPromoInput("NECTAR10")} className="rounded-md border px-3 py-1 text-sm">NECTAR10</button>
									<button type="button" onClick={() => setPromoInput("SAVE5")} className="rounded-md border px-3 py-1 text-sm">SAVE5</button>
									<button type="button" onClick={() => setPromoInput("FREESHIP")} className="rounded-md border px-3 py-1 text-sm">FREESHIP</button>
								</div>
							</div>
						)}

						<div className="mt-4 rounded-lg border border-[#F0F0F0] p-4">
							<div className="mb-3 flex items-center justify-between">
								<span className="font-poppins text-[14px] text-[#7C7C7C]">Subtotal</span>
								<span className="font-poppins text-[14px] font-semibold text-[#181725]">${subtotal.toFixed(2)}</span>
							</div>
							{discount > 0 && (
								<div className="mb-3 flex items-center justify-between text-[#4CAF82]">
									<span className="font-poppins text-[14px]">Discount</span>
									<span className="font-poppins text-[14px] font-semibold">-${discount.toFixed(2)}</span>
								</div>
							)}
							<div className="mb-3 flex items-center justify-between">
								<span className="font-poppins text-[14px] text-[#7C7C7C]">Delivery</span>
								<span className="font-poppins text-[14px] font-semibold text-[#181725]">${deliveryFee.toFixed(2)}</span>
							</div>
							<hr className="my-2 border-t border-dashed border-[#E8E8E8]" />
							<div className="flex items-center justify-between">
								<span className="font-poppins text-[16px] font-bold text-[#181725]">Total</span>
								<span className="font-poppins text-[16px] font-bold text-[#181725]">${total.toFixed(2)}</span>
							</div>
						</div>

						<p className="mt-5 font-poppins text-[13px] leading-[18px] text-[#7C7C7C]">
							By placing an order you agree to our{" "}
							<button type="button" onClick={() => router.push("/terms")} className="font-semibold text-[#181725]">
								Terms
							</button>
							{" "}And{" "}
							<button type="button" onClick={() => router.push("/conditions")} className="font-semibold text-[#181725]">
								Conditions
							</button>
						</p>
					</div>

					<button
						type="button"
						onClick={handlePlaceOrder}
						className="mt-6 flex h-[67px] w-full items-center justify-center rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white transition-transform duration-300 active:scale-[0.99] md:w-[364px] md:self-center"
					>
						Place Order
					</button>
				</div>
			</div>
		</div>
	);
}
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

import CartItemRow from "@/components/CartItemRow";
import CheckoutSheet from "@/components/CheckoutSheet";
import OrderFailedModal from "@/components/OrderFailedModal";

import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return (
		<span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>
			{children}
		</span>
	);
}

export default function Cart() {
	const router = useRouter();
	const items = useCartStore((state) => state.items);
	const openCheckout = useCheckoutStore((state) => state.openCheckout);
	const totals = useCartStore((state) => state.getTotals)();

	return (
		<div className="min-h-screen bg-white pb-[172px]">
			<main>
				{/* Header */}
				<div className="fixed left-0 right-0 top-0 z-50 bg-white">
					<div className="flex h-[44px] items-center justify-center px-6">
						<h1 className="font-poppins text-[20px] font-bold text-[#181725]">My Cart</h1>
					</div>
				</div>

				<div className="px-4 pt-[64px]">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center pt-16 text-center">
							<div className="text-[48px]">🛒</div>
							<p className="mt-4 font-poppins text-[20px] font-semibold text-[#181725]">Your cart is empty</p>
							<button
								type="button"
								onClick={() => router.push("/home")}
								className="mt-4 h-[67px] w-full rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white"
							>
								Start Shopping
							</button>
						</div>
					) : (
						<div className="space-y-0 bg-white">
							{items.map((item) => (
								<CartItemRow key={item.product.id} item={item} />
							))}
						</div>
					)}
				</div>
			</main>

			{/* Checkout Button */}
			{items.length > 0 && (
				<div className="fixed bottom-[100px] left-0 right-0 z-40 flex justify-center px-6">
					<button
						type="button"
						onClick={openCheckout}
						className="relative h-[67px] w-full max-w-[364px] rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white"
					>
						Go to Checkout
						<span className="absolute right-6 top-1/2 -translate-y-1/2 rounded bg-[#489E67] px-1.5 py-0.5 text-[12px]">
							${totals.total.toFixed(2)}
						</span>
					</button>
				</div>
			)}

			{/* Bottom Nav */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817]">
				<div className="flex h-full items-center justify-around px-4">
					<button type="button" onClick={() => router.push("/home")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiGrid className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Shop</span>
					</button>
					<button type="button" onClick={() => router.push("/explore")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><TbSearch className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Explore</span>
					</button>
					<button type="button" aria-current="page" className="flex flex-col items-center gap-1">
						<BottomNavIcon active><IoCartOutline className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#4CAF82]">Cart</span>
					</button>
					<button type="button" onClick={() => router.push("/favourites")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiHeart className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Favorite</span>
					</button>
					<button type="button" onClick={() => router.push("/account")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiUser className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Account</span>
					</button>
				</div>
			</nav>

			<CheckoutSheet />
			<OrderFailedModal />
		</div>
	);
}
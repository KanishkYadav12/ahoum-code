"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

import Sidebar from "@/components/layout/Sidebar";
import CartItemRow from "@/components/CartItemRow";
import CheckoutSheet from "@/components/CheckoutSheet";
import OrderFailedModal from "@/components/OrderFailedModal";

import { initialCartItems } from "@/data/cartData";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

import { ProductCategory, type Product } from "@/types";


function BottomNavIcon({
	active,
	children,
}: {
	active: boolean;
	children: ReactNode;
}) {
	return (
		<span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>
			{children}
		</span>
	);
}

function toStoreProduct(item: (typeof initialCartItems)[number]): Product {
	return {
		id: String(item.id),
		name: item.name,
		description: item.description,
		price: item.price,
		unit: item.description,
		category: ProductCategory.FreshFruits,
		image: item.image,
		rating: 0,
		reviewCount: 0,
		inStock: true,
		isOrganic: false,
		isBestSeller: false,
		tags: [],
	};
}
export default function Cart() {
	const router = useRouter();
	const items = useCartStore((state) => state.items);
	const openCheckout = useCheckoutStore((state) => state.openCheckout);
	const totals = useCartStore((state) => state.getTotals)();

	return (
		<div className="min-h-screen bg-white pb-[172px] md:flex md:bg-[#F8F8F8] md:pb-[120px]">
			<Sidebar />
			<main className="flex-1 md:ml-[240px]">
				<div className="fixed left-0 right-0 top-0 z-50 bg-white md:hidden">
					<div className="flex h-[44px] items-center justify-center px-6">
						<h1 className="font-poppins text-[20px] font-bold text-[#181725]">My Cart</h1>
					</div>
				</div>

				<div className="hidden md:sticky md:top-0 md:z-30 md:block md:bg-white md:px-8 md:py-4 md:shadow-sm">
					<div className="mx-auto hidden max-w-7xl md:flex md:items-center md:justify-between">
						<h1 className="font-poppins text-[24px] font-bold text-[#181725]">My Cart</h1>
					</div>
				</div>

				<div className="mx-auto max-w-7xl px-4 pt-[64px] md:px-8 md:pt-6">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center pt-16 text-center">
							<div className="text-[48px]">🛒</div>
							<p className="mt-4 font-poppins text-[20px] font-semibold text-[#181725]">Your cart is empty</p>
							<button type="button" onClick={() => router.push("/home")} className="mt-4 h-[67px] w-full rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white md:w-[364px]">
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

			{items.length > 0 ? (
				<div className="fixed bottom-[100px] left-0 right-0 z-40 flex justify-center px-6 md:bottom-6">
					<button type="button" onClick={openCheckout} className="relative h-[67px] w-full max-w-[364px] rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white">
						Go to Checkout
						<span className="absolute right-6 top-1/2 -translate-y-1/2 rounded bg-[#489E67] px-1.5 py-0.5 text-[12px]">
							${totals.total.toFixed(2)}
						</span>
					</button>
				</div>
			) : null}

			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817] md:hidden">
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

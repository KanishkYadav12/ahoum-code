"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import Sidebar from "@/components/layout/Sidebar";
import FavouriteItemRow from "@/components/FavouriteItemRow";
import { useFavouritesStore } from "@/stores/favouritesStore";

function StatusBar() {
	return (
		<div className="flex h-11 items-center justify-between bg-white px-6 pt-[4.83px] text-[#181725] md:hidden">
			<span className="text-sm font-medium leading-none">9:41</span>
			<div className="flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current" aria-hidden="true"><path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" /></svg>
				<svg viewBox="0 0 16 12" className="h-3 w-4 fill-current" aria-hidden="true"><path d="M8 10.5 6.6 9.1c1.6-1.6 4.2-1.6 5.8 0L11 10.5c-1-1-2.6-1-3.6 0zm-2.4-2.5L4.2 6.6c3-3 7.9-3 10.8 0l-1.4 1.4c-2.2-2.2-5.8-2.2-8 0zM1.5 5.1.1 3.7c4.3-4.2 11.3-4.2 15.6 0l-1.4 1.4c-3.5-3.4-9.3-3.4-12.8 0zM7.8 11.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" /></svg>
				<svg viewBox="0 0 24 12" className="h-3 w-6 fill-current" aria-hidden="true"><path d="M2 2h16v8H2V2zm18 3-2-1v4l2-1V5z" /><rect x="3.5" y="3.5" width="12.5" height="5" rx="1" /></svg>
			</div>
		</div>
	);
}

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>{children}</span>;
}

export default function Favourites() {
	const router = useRouter();
	const items = useFavouritesStore((state) => state.items);
	const addAllToCart = useFavouritesStore((state) => state.addAllToCart);

	useEffect(() => {
		// Keep favourites available across sessions via the persisted store.
	}, []);

	return (
		<div className="min-h-screen bg-white pb-[172px] md:flex md:bg-[#F8F8F8] md:pb-[120px]">
			<Sidebar />
			<main className="flex-1 md:ml-[240px]">
				<div className="fixed left-0 right-0 top-0 z-50 bg-white md:hidden">
					<StatusBar />
					<div className="flex h-[44px] items-center justify-center px-6">
						<h1 className="font-poppins text-[20px] font-normal text-[#181725]">Favorurite</h1>
					</div>
				</div>

				<div className="hidden md:sticky md:top-0 md:z-30 md:block md:bg-white md:px-8 md:py-4 md:shadow-sm">
					<div className="mx-auto hidden max-w-7xl md:flex md:items-center md:justify-between">
						<h1 className="font-poppins text-[24px] font-bold text-[#181725]">Favorurite</h1>
					</div>
				</div>

				<div className="mx-auto max-w-7xl px-4 pt-[136px] md:px-8 md:pt-6">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center pt-16 text-center">
							<div className="text-[48px]">🤍</div>
							<p className="mt-4 font-poppins text-[20px] font-semibold text-[#181725]">No favourites yet</p>
							<p className="mt-2 font-poppins text-[14px] text-[#7C7C7C]">Add items you love to your favourites</p>
							<button type="button" onClick={() => router.push("/home")} className="mt-4 h-[67px] w-full rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white md:w-[364px]">
								Start Shopping
							</button>
						</div>
					) : (
						<div className="space-y-0 bg-white">
							{items.map((item) => (
								<FavouriteItemRow key={item.id} item={item} onClick={() => router.push(`/product/${item.id}`)} />
							))}
						</div>
					)}
				</div>
			</main>

			{items.length > 0 ? (
				<button type="button" onClick={() => { addAllToCart(); router.push("/cart"); }} className="fixed bottom-[100px] left-1/2 z-40 h-[67px] w-[364px] -translate-x-1/2 rounded-[19px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white md:bottom-6">
					Add All To Cart
				</button>
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
					<button type="button" onClick={() => router.push("/cart")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><IoCartOutline className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Cart</span>
					</button>
					<button type="button" aria-current="page" className="flex flex-col items-center gap-1">
						<BottomNavIcon active><FiHeart className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#4CAF82]">Favourite</span>
					</button>
					<button type="button" onClick={() => router.push("/account")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiUser className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Account</span>
					</button>
				</div>
			</nav>
		</div>
	);
}

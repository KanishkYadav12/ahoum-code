"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline, IoOptionsOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

import Sidebar from "@/components/layout/Sidebar";
import ExploreCategoryCard from "@/components/ExploreCategoryCard";
import FilterSheet from "@/components/FilterSheet";

import { categories } from "@/data/categories";
import { useFilterStore } from "@/stores/filterStore";
import { type ReactNode } from "react";

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>{children}</span>;
}

export default function Explore() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const openFilter = useFilterStore((state) => state.openFilter);

	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-white pb-[92px] md:flex md:bg-[#F8F8F8] md:pb-0">
			<Sidebar />

			<main className="flex-1 md:ml-[240px]">
				<header className="sticky top-0 z-40 bg-white px-6 pt-4 pb-4 md:static md:px-8 md:pt-8">
					<h1 className="text-center font-poppins text-[20px] font-bold text-[#181725] md:text-left md:text-[24px]">
						Find Products
					</h1>

					<div className="mt-5 flex items-center gap-2">
						<div className="relative flex-1">
							<TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#181725]" />
							<input
								type="text"
								placeholder="Search Store"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="h-[52px] w-full rounded-[15px] bg-[#F2F3F2] pl-12 pr-4 font-poppins text-[14px] font-semibold placeholder-[#7C7C7C] outline-none"
							/>
						</div>
						<button
							type="button"
							onClick={openFilter}
							className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] bg-[#F2F3F2] md:hidden"
						>
							<IoOptionsOutline className="text-[20px] text-[#181725]" />
						</button>
					</div>
				</header>

				<div className="px-6 md:px-8">
					<div className="mt-4 grid grid-cols-2 gap-4 pb-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{filteredCategories.map((category) => (
							<ExploreCategoryCard
								key={category.id}
								category={category}
								onClick={() => {
									if (category.slug === "beverages") {
										router.push("/category/beverages");
									} else {
										router.push(`/search?category=${category.slug}`);
									}
								}}
							/>
						))}
					</div>
				</div>
			</main>

			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817] md:hidden">
				<div className="flex h-full items-center justify-around px-4">
					<button
						type="button"
						onClick={() => router.push("/home")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<FiGrid className="h-6 w-6" aria-hidden="true" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Shop</span>
					</button>
					<button type="button" aria-current="page" className="flex flex-col items-center gap-1">
						<BottomNavIcon active={true}>
							<TbSearch className="h-6 w-6" aria-hidden="true" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#4CAF82]">Explore</span>
					</button>
					<button
						type="button"
						onClick={() => router.push("/cart")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<IoCartOutline className="h-6 w-6" aria-hidden="true" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Cart</span>
					</button>
					<button
						type="button"
						onClick={() => router.push("/favourites")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<FiHeart className="h-6 w-6" aria-hidden="true" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Favorite</span>
					</button>
					<button
						type="button"
						onClick={() => router.push("/account")}
						className="flex flex-col items-center gap-1"
					>
						<BottomNavIcon active={false}>
							<FiUser className="h-6 w-6" aria-hidden="true" />
						</BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Account</span>
					</button>
				</div>
			</nav>

			<FilterSheet />
		</div>
	);
}

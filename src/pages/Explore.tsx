"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline, IoOptionsOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";

import ExploreCategoryCard from "@/components/ExploreCategoryCard";
import FilterSheet from "@/components/FilterSheet";

import { categories } from "@/data/categories";
import { useFilterStore } from "@/stores/filterStore";
import { ReactNode } from "react";
function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>{children}</span>;
}

export default function Explore() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const openFilter = useFilterStore((state) => state.openFilter);
	const selectedCategories = useFilterStore((state) => state.categories);

	const filteredCategories = categories.filter((category) => {
		const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter = selectedCategories.length === 0 || selectedCategories.includes(category.slug);
		return matchesSearch && matchesFilter;
	});

	const hasActiveFilters = selectedCategories.length > 0;

	return (
		<div className="min-h-screen bg-white pb-[92px]">
			<main>
				{/* Header */}
				<header className="sticky top-0 z-40 bg-white px-6 pb-4 pt-4">
					<h1 className="text-center font-poppins text-[20px] font-bold text-[#181725]">
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
							className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-[15px] ${hasActiveFilters ? "bg-[#4CAF82]" : "bg-[#F2F3F2]"}`}
						>
							<IoOptionsOutline className={`text-[20px] ${hasActiveFilters ? "text-white" : "text-[#181725]"}`} />
							{hasActiveFilters && (
								<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF4444] font-poppins text-[10px] font-bold text-white">
									{selectedCategories.length}
								</span>
							)}
						</button>
					</div>

					{/* Active filter chips */}
					{hasActiveFilters && (
						<div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
							<span className="shrink-0 font-poppins text-[12px] text-[#7C7C7C]">Filtered:</span>
							{selectedCategories.map((cat) => (
								<span
									key={cat}
									className="shrink-0 rounded-full bg-[#E8F5EE] px-3 py-1 font-poppins text-[12px] font-semibold text-[#4CAF82]"
								>
									{cat.replace(/-/g, " ")}
								</span>
							))}
							<button
								type="button"
								onClick={() => useFilterStore.getState().resetFilters()}
								className="shrink-0 font-poppins text-[12px] font-semibold text-[#D32F2F]"
							>
								Clear
							</button>
						</div>
					)}
				</header>

				<div className="px-6">
					{filteredCategories.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-20">
							<p className="font-poppins text-[16px] font-semibold text-[#181725]">No categories found</p>
							<button
								type="button"
								onClick={() => useFilterStore.getState().resetFilters()}
								className="mt-3 font-poppins text-[14px] font-semibold text-[#4CAF82]"
							>
								Clear filters
							</button>
						</div>
					) : (
						<div className="mt-4 grid grid-cols-2 gap-4 pb-8">
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
					)}
				</div>
			</main>

			{/* Bottom Nav */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817]">
				<div className="flex h-full items-center justify-around px-4">
					<button type="button" onClick={() => router.push("/home")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiGrid className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Shop</span>
					</button>
					<button type="button" aria-current="page" className="flex flex-col items-center gap-1">
						<BottomNavIcon active={true}><TbSearch className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#4CAF82]">Explore</span>
					</button>
					<button type="button" onClick={() => router.push("/cart")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><IoCartOutline className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Cart</span>
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

			<FilterSheet />
		</div>
	);
}
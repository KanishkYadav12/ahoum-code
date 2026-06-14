"use client";

import { useEffect, type ChangeEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiHeart, FiGrid, FiSearch, FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import Sidebar from "@/components/layout/Sidebar";
import ExploreCategoryCard from "@/components/ExploreCategoryCard";
import { useDebounce } from "@/hooks/useDebounce";
import { useExploreStore } from "@/stores/exploreStore";

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

export default function Explore() {
	const router = useRouter();
	const searchQuery = useExploreStore((state) => state.searchQuery);
	const filteredCategories = useExploreStore((state) => state.filteredCategories);
	const isLoading = useExploreStore((state) => state.isLoading);
	const fetchCategories = useExploreStore((state) => state.fetchCategories);
	const setSearchQuery = useExploreStore((state) => state.setSearchQuery);
	const debouncedSearch = useDebounce(searchQuery, 300);

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	useEffect(() => {
		setSearchQuery(debouncedSearch);
	}, [debouncedSearch, setSearchQuery]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="min-h-screen bg-white pb-[92px] md:flex md:bg-[#F8F8F8] md:pb-0">
			<Sidebar />
			<main className="flex-1 md:ml-[240px]">
				<div className="md:sticky md:top-0 md:z-30 md:bg-white md:px-8 md:py-4 md:shadow-sm">
					<div className="mx-auto hidden max-w-7xl md:flex md:items-center md:gap-6">
						<h1 className="whitespace-nowrap text-[24px] font-bold text-[#181725]">Find Products</h1>
						<div className="flex h-[52px] max-w-[500px] flex-1 items-center gap-3 rounded-[15px] bg-[#F2F3F2] px-4">
							<FiSearch className="h-[18px] w-[18px] text-[#7C7C7C]" aria-hidden="true" />
							<input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search Store" className="w-full bg-transparent text-[16px] font-normal text-[#7C7C7C] outline-none placeholder:text-[#7C7C7C]" />
						</div>
					</div>
				</div>

				<div className="fixed left-0 right-0 top-0 z-50 bg-white md:hidden">
					<StatusBar />
					<h1 className="mt-2 text-center text-[20px] font-bold text-[#181725]">Find Products</h1>
					<div className="mx-6 mt-3 mb-4">
						<div className="flex h-[52px] items-center gap-3 rounded-[15px] bg-[#F2F3F2] px-4">
							<FiSearch className="h-[18px] w-[18px] text-[#7C7C7C]" aria-hidden="true" />
							<input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search Store" className="w-full bg-transparent text-[16px] font-normal text-[#7C7C7C] outline-none placeholder:text-[#7C7C7C]" />
						</div>
					</div>
				</div>

				<div className="mx-auto max-w-7xl px-4 pt-[176px] md:px-8 md:pt-6">
					{isLoading ? (
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
							{Array.from({ length: 8 }).map((_, index) => <div key={index.toString()} className="h-[189px] w-full animate-pulse rounded-[18px] bg-[#F2F3F2] md:h-[220px]" />)}
						</div>
					) : filteredCategories.length > 0 ? (
						<div className="grid grid-cols-2 gap-[15px] md:grid-cols-4 md:gap-5">
							{filteredCategories.map((category) => <ExploreCategoryCard key={category.id} category={category} onClick={() => router.push(`/products?category=${category.id}`)} />)}
						</div>
					) : (
						<div className="mt-20 flex flex-col items-center justify-center gap-4 pb-8 text-center">
							<span className="text-[48px]">🔍</span>
							<p className="text-[18px] font-semibold text-[#181725]">No categories found</p>
							<p className="text-[14px] text-[#7C7C7C]">Try a different search term</p>
						</div>
					)}
				</div>
			</main>

			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817] md:hidden">
				<div className="flex h-full items-center justify-around px-4">
						<button type="button" onClick={() => router.push("/home")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiGrid className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Shop</span>
					</button>
					<button type="button" className="flex flex-col items-center gap-1" aria-current="page">
						<BottomNavIcon active><TbSearch className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#4CAF82]">Explore</span>
					</button>
						<button type="button" onClick={() => router.push("/cart")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><IoCartOutline className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Cart</span>
					</button>
						<button type="button" onClick={() => router.push("/favourites")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiHeart className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Favourite</span>
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

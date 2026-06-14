"use client";

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiHeart, FiSearch, FiUser, FiFilter } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import Sidebar from "@/components/layout/Sidebar";
import FilterSheet from "@/components/FilterSheet";
import { useCartStore } from "@/stores/cartStore";
import { useFilterStore } from "@/stores/filterStore";
import { useSearchStore } from "@/stores/searchStore";
import { ProductCategory } from "@/types";

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

function CheckBadge() {
	return <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3D9E6E] text-[16px] font-bold text-white">✓</span>;
}

function PlusButton({ onClick }: { onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={(event) => {
				event.stopPropagation();
				onClick();
			}}
			className="flex h-[45.67px] w-[45.67px] items-center justify-center rounded-full bg-[#4CAF82] text-[20px] font-bold text-white"
			aria-label="Add to cart"
		>
			+
		</button>
	);
}

function ProductCard({
	product,
	isSelected,
	onAddToCart,
	onClick,
}: {
	product: { id: number; name: string; description: string; price: number; image: string };
	isSelected: boolean;
	onAddToCart: () => void;
	onClick: () => void;
}) {
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			className={`flex h-[248.51px] flex-col justify-between rounded-[18px] border bg-white p-3 text-left outline-none transition-transform hover:scale-[1.01] ${isSelected ? "border-2 border-[#4CAF82]" : "border-[#E2E2E2]"}`}
		>
			<div className="flex flex-col gap-2">
				<div className="flex h-[120px] items-center justify-center overflow-hidden rounded-[12px] bg-[#F4F4F4]">
					<img src={product.image} alt={product.name} className="h-[120px] w-[150px] object-contain" />
				</div>
				<div>
					<h2 className="mt-2 overflow-hidden font-poppins text-[16px] font-semibold leading-[21px] text-[#181725]">{product.name}</h2>
					<p className="mt-1 font-poppins text-[14px] text-[#7C7C7C]">{product.description}</p>
				</div>
			</div>
			<div className="flex items-end justify-between gap-3">
				<span className="font-poppins text-[18px] font-semibold text-[#181725]">${product.price.toFixed(2)}</span>
				<PlusButton onClick={onAddToCart} />
			</div>
		</div>
	);
}

function SkeletonGrid() {
	return (
		<div className="grid grid-cols-2 gap-4 px-4 mt-[130px] md:grid-cols-4 md:gap-5 md:px-8">
			{Array.from({ length: 6 }).map((_, index) => (
				<div key={index.toString()} className="h-[248px] w-full animate-pulse rounded-[18px] bg-[#F2F3F2]" />
			))}
		</div>
	);
}

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>{children}</span>;
}

function toCartProduct(product: { id: number; name: string; description: string; price: number; image: string }) {
	return {
		id: String(product.id),
		name: product.name,
		description: product.description,
		price: product.price,
		unit: product.description,
		category: ProductCategory.DairyEggs,
		image: product.image,
		rating: 0,
		reviewCount: 0,
		inStock: true,
		isOrganic: false,
		isBestSeller: false,
		tags: [],
	};
}

export default function Search() {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const query = useSearchStore((state) => state.query);
	const results = useSearchStore((state) => state.results);
	const selectedProductId = useSearchStore((state) => state.selectedProductId);
	const isLoading = useSearchStore((state) => state.isLoading);
	const fetchProducts = useSearchStore((state) => state.fetchProducts);
	const setQuery = useSearchStore((state) => state.setQuery);
	const setSelectedProduct = useSearchStore((state) => state.setSelectedProduct);
	const clearSearch = useSearchStore((state) => state.clearSearch);
	const addToCart = useCartStore((state) => state.addToCart);
	const openFilter = useFilterStore((state) => state.openFilter);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleClear = (): void => {
		clearSearch();
		inputRef.current?.focus();
	};

	return (
		<div className="min-h-screen bg-white pb-[92px] md:flex md:bg-[#F8F8F8] md:pb-0">
			<Sidebar />
			<main className="flex-1 md:ml-[240px]">
				<div className="fixed left-0 right-0 top-0 z-50 bg-white md:hidden">
					<StatusBar />
					<div className="flex items-center gap-3 px-6 pb-3 pt-1">
						<div className="flex h-[52px] flex-1 items-center gap-3 rounded-[15px] border border-[#FFFFFF] bg-[#F2F3F2] px-4">
							<FiSearch className="h-[18px] w-[18px] text-[#7C7C7C]" aria-hidden="true" />
							<input
								ref={inputRef}
								autoFocus
								type="text"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Egg"
								className="w-full bg-transparent text-[16px] font-normal text-[#181725] outline-none placeholder:text-[#7C7C7C]"
							/>
							{query.length > 0 ? (
								<button type="button" onClick={handleClear} className="text-[#7C7C7C]" aria-label="Clear search">
									×
								</button>
							) : null}
						</div>
						<button type="button" onClick={openFilter} aria-label="Open filters" className="flex h-[18px] w-[17px] items-center justify-center text-[#181725]">
							<FiFilter className="h-[17px] w-[16.8px]" />
						</button>
					</div>
				</div>

				<div className="hidden md:sticky md:top-0 md:z-30 md:block md:bg-white md:px-8 md:py-4 md:shadow-sm">
					<div className="mx-auto hidden max-w-7xl md:flex md:items-center md:gap-4">
						<div className="flex h-[52px] max-w-[500px] flex-1 items-center gap-3 rounded-[15px] border border-[#FFFFFF] bg-[#F2F3F2] px-4">
							<FiSearch className="h-[18px] w-[18px] text-[#7C7C7C]" aria-hidden="true" />
							<input
								ref={inputRef}
								autoFocus
								type="text"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Egg"
								className="w-full bg-transparent text-[16px] font-normal text-[#181725] outline-none placeholder:text-[#7C7C7C]"
							/>
							{query.length > 0 ? (
								<button type="button" onClick={handleClear} className="text-[#7C7C7C]" aria-label="Clear search">
									×
								</button>
							) : null}
						</div>
						<button type="button" onClick={openFilter} aria-label="Open filters" className="flex h-[18px] w-[17px] items-center justify-center text-[#181725]">
							<FiFilter className="h-[17px] w-[16.8px]" />
						</button>
					</div>
				</div>

				<div className="mx-auto max-w-7xl px-4 pt-[130px] md:px-8 md:pt-6">
					{isLoading ? (
						<SkeletonGrid />
					) : results.length === 0 ? (
						<div className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
							<span className="text-[48px]">🔍</span>
							<p className="text-[18px] font-semibold text-[#181725]">No results found</p>
							<p className="text-[14px] text-[#7C7C7C]">Try searching for something else</p>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-[15px] px-4 pb-4 md:grid-cols-4 md:gap-5 md:px-0">
							{results.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									isSelected={selectedProductId === product.id}
									onClick={() => setSelectedProduct(product.id)}
									onAddToCart={() => addToCart(toCartProduct(product))}
								/>
							))}
						</div>
					)}
				</div>
			</main>
			<FilterSheet />

			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817] md:hidden">
				<div className="flex h-full items-center justify-around px-4">
					<button type="button" onClick={() => router.push("/home")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiGrid className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Shop</span>
					</button>
					<button type="button" aria-current="page" className="flex flex-col items-center gap-1">
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

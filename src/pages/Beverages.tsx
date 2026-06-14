"use client";

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiFilter, FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import Sidebar from "@/components/layout/Sidebar";
import { useBeveragesStore } from "@/stores/beveragesStore";
import type { Product } from "@/data/beveragesData";


function CheckBadge() {
	return (
		<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3D9E6E] text-[16px] font-bold text-white">✓</span>
	);
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

function ProductCard({ product, selected, onSelect, onAddToCart }: { product: Product; selected: boolean; onSelect: () => void; onAddToCart: () => void; }) {
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onSelect();
		}
	};

	return (
		<div role="button" tabIndex={0} onClick={onSelect} onKeyDown={handleKeyDown} className={`flex h-[248.51px] flex-col justify-between rounded-[18px] border bg-white p-3 text-left outline-none transition-transform hover:scale-[1.01] ${selected ? "border-2 border-[#4CAF82]" : "border-[#E2E2E2]"}`}>
			<div className="flex flex-col gap-2">
				<div className="flex h-[120px] items-center justify-center rounded-[12px] bg-[#F4F4F4] overflow-hidden">
					<img src={product.image} alt={product.name} className="h-[120px] w-[150px] object-contain" />
				</div>
				<div>
					<h2 className="mt-2 max-h-[42px] overflow-hidden font-poppins text-[16px] font-semibold leading-[21px] text-[#181725]">{product.name}</h2>
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

function AddToCartButton({ onClick }: { onClick: () => void }) {
	return (
		<button type="button" onClick={onClick} className="fixed bottom-[100px] left-1/2 z-50 flex h-[67px] w-[364px] -translate-x-1/2 items-center justify-between rounded-[20px] bg-[#4CAF82] px-4 text-white shadow-lg">
			<span className="flex items-center gap-3">
				<CheckBadge />
				<span className="font-poppins text-[18px] font-semibold">Add To Cart</span>
			</span>
			<span className="font-poppins text-[14px] font-normal text-white/80">Open Cart &gt;</span>
		</button>
	);
}

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>{children}</span>;
}

export default function Beverages() {
	const router = useRouter();
	const products = useBeveragesStore((state) => state.products);
	const cart = useBeveragesStore((state) => state.cart);
	const isLoading = useBeveragesStore((state) => state.isLoading);
	const fetchProducts = useBeveragesStore((state) => state.fetchProducts);
	const addToCart = useBeveragesStore((state) => state.addToCart);
	const [selectedProductId, setSelectedProductId] = useState<number>(1);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<div className="min-h-screen bg-white pb-[92px] md:flex md:bg-[#F8F8F8] md:pb-0">
			<Sidebar />
			<main className="flex-1 md:ml-[240px]">
				<div className="fixed left-0 right-0 top-0 z-50 bg-white md:hidden">
					<div className="flex h-[56px] items-center justify-between px-6">
						<button type="button" onClick={() => router.back()} className="text-[#181725]" aria-label="Go back">
							<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
						</button>
						<h1 className="font-poppins text-[20px] font-semibold text-[#181725]">Beverages</h1>
						<button type="button" aria-label="Filter products" className="text-[#181725]">
							<FiFilter className="h-[18px] w-[18px]" />
						</button>
					</div>
				</div>

				<div className="hidden md:sticky md:top-0 md:z-30 md:block md:bg-white md:px-8 md:py-4 md:shadow-sm">
					<div className="mx-auto hidden max-w-7xl md:flex md:items-center md:justify-between md:gap-6">
						<div className="flex items-center gap-4">
							<button type="button" onClick={() => router.back()} className="text-[#181725]" aria-label="Go back">
								<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
							</button>
							<h1 className="whitespace-nowrap text-[24px] font-bold text-[#181725]">Beverages</h1>
						</div>
						<button type="button" aria-label="Filter products" className="text-[#181725]">
							<FiFilter className="h-[18px] w-[18px]" />
						</button>
					</div>
				</div>

				<div className="px-4 pt-[104.93px] md:px-8 md:pt-6">
					{isLoading ? (
						<div className="grid grid-cols-2 gap-[15px] md:grid-cols-4 md:gap-5">
							{Array.from({ length: 6 }).map((_, index) => (
								<div key={index.toString()} className="h-[248.51px] animate-pulse rounded-[18px] border border-[#E2E2E2] bg-[#F2F3F2]" />
							))}
						</div>
					) : (
						<div className="grid grid-cols-2 gap-[15px] md:grid-cols-4 md:gap-5">
							{products.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									selected={selectedProductId === product.id}
									onSelect={() => setSelectedProductId(product.id)}
									onAddToCart={() => addToCart(product)}
								/>
							))}
						</div>
					)}
				</div>
			</main>

			{cart.length > 0 ? <AddToCartButton onClick={() => router.push("/cart")} /> : null}

			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] bg-white shadow-[2px_-5px_15px_0px_#555E5817] md:hidden">
				<div className="flex h-full items-center justify-around px-4">
					<button type="button" onClick={() => router.push("/home")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={true}><FiGrid className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#4CAF82]">Shop</span>
					</button>
					<button type="button" onClick={() => router.push("/explore")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><TbSearch className="h-6 w-6" aria-hidden="true" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Explore</span>
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

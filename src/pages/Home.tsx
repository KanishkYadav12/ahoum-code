"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FiGrid, FiHeart, FiUser } from "react-icons/fi";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import ProductCard from "@/components/ProductCard";
import CarrotIcon from "@/components/CarrotIcon";
import { useSearchStore } from "@/stores/searchStore";
import { useDebounce } from "@/hooks/useDebounce";
import { api } from "@/lib/api";
import { ProductSkeleton, CategorySkeleton } from "@/components/ui/Skeleton";
import { Product, Category, ProductCategory } from "@/types";

function BottomNavIcon({ active, children }: { active: boolean; children: ReactNode }) {
	return <span className={active ? "text-[#4CAF82]" : "text-[#7C7C7C]"}>{children}</span>;
}

export default function Home() {
	const router = useRouter();
	const [exclusiveOffers, setExclusiveOffers] = useState<Product[]>([]);
	const [bestSelling, setBestSelling] = useState<Product[]>([]);
	const [groceries, setGroceries] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const { query, setQuery } = useSearchStore();
	const debouncedQuery = useDebounce(query, 500);

	useEffect(() => {
		async function fetchData() {
			try {
				const [productsRes, catsRes] = await Promise.all([api.products.getAll(), api.categories.getAll()]);

				if (productsRes.success && productsRes.data) {
					const allProducts = productsRes.data;
					setExclusiveOffers(allProducts.filter((p) => p.isBestSeller).slice(0, 5));
					setBestSelling(allProducts.slice(5, 10));
					setGroceries(allProducts.filter((p) => p.category === ProductCategory.Vegetables).slice(0, 5));
				}

				if (catsRes.success && catsRes.data) {
					setCategories(catsRes.data);
				}
			} catch (error) {
				console.error("Failed to fetch home data", error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (debouncedQuery) {
			router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
		}
	}, [debouncedQuery, router]);

	return (
		<div className="min-h-screen bg-white pb-[92px]">
			<main>
				{/* Header */}
				<header className="flex flex-col items-center px-6 pt-4">
					<CarrotIcon width={31} height={31} />
					<div className="mt-2 flex items-center gap-2 text-[#4C4F4D]">
						<span className="text-[18px] font-semibold">Dhaka, Banani</span>
					</div>
					<div className="mt-5 w-full">
						<div className="relative">
							<IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[#181725]" />
							<input
								type="text"
								placeholder="Search Store"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="h-[52px] w-full rounded-[15px] bg-[#F2F3F2] pl-12 pr-4 font-poppins text-[14px] font-semibold placeholder-[#7C7C7C] outline-none"
							/>
						</div>
					</div>
				</header>

				<div className="px-4">
					{/* Banner */}
					<section className="mt-5">
						<div className="relative h-[115px] w-full overflow-hidden rounded-[8px]">
							<img
								src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
								alt="Fresh Vegetables"
								className="h-full w-full object-cover brightness-[0.85]"
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
								<h2 className="font-poppins text-[20px] font-bold">Fresh Vegetables</h2>
								<p className="font-poppins text-[12px] font-medium text-[#53B175]">Get Up To 40% OFF</p>
							</div>
						</div>
					</section>

					{/* Exclusive Offer */}
					<section className="mt-8">
						<div className="flex items-center justify-between">
							<h3 className="font-poppins text-[24px] font-semibold text-[#181725]">Exclusive Offer</h3>
							<button type="button" className="text-[16px] font-semibold text-[#53B175]">See all</button>
						</div>
						<div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4">
							{isLoading
								? Array(5).fill(0).map((_, i) => <ProductSkeleton key={i} />)
								: exclusiveOffers.map((product) => <ProductCard key={product.id} product={product} />)}
						</div>
					</section>

					{/* Best Selling */}
					<section className="mt-8">
						<div className="flex items-center justify-between">
							<h3 className="font-poppins text-[24px] font-semibold text-[#181725]">Best Selling</h3>
							<button type="button" className="text-[16px] font-semibold text-[#53B175]">See all</button>
						</div>
						<div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4">
							{isLoading
								? Array(5).fill(0).map((_, i) => <ProductSkeleton key={i} />)
								: bestSelling.map((product) => <ProductCard key={product.id} product={product} />)}
						</div>
					</section>

					{/* Groceries */}
					<section className="mt-8">
						<div className="flex items-center justify-between">
							<h3 className="font-poppins text-[24px] font-semibold text-[#181725]">Groceries</h3>
							<button type="button" className="text-[16px] font-semibold text-[#53B175]">See all</button>
						</div>
						<div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4">
							{isLoading
								? Array(3).fill(0).map((_, i) => <CategorySkeleton key={i} />)
								: categories.slice(0, 3).map((cat, idx) => (
									<div
										key={cat.id}
										className="flex h-[105px] w-[248px] shrink-0 items-center gap-4 rounded-[18px] px-4"
										style={{ backgroundColor: idx % 2 === 0 ? "#F8A44C26" : "#53B17526" }}
									>
										<img src={cat.image} alt={cat.name} className="h-[70px] w-[70px] object-contain" />
										<span className="font-poppins text-[20px] font-semibold text-[#3E423F]">{cat.name}</span>
									</div>
								))}
						</div>
						<div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-4">
							{isLoading
								? Array(5).fill(0).map((_, i) => <ProductSkeleton key={i} />)
								: groceries.map((product) => <ProductCard key={product.id} product={product} />)}
						</div>
					</section>
				</div>
			</main>

			{/* Bottom Nav */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 h-[92px] border-t border-[#E2E2E2] bg-white">
				<div className="flex h-full items-center justify-around px-4">
					<button type="button" className="flex flex-col items-center gap-1">
						<BottomNavIcon active={true}><FiGrid className="h-6 w-6" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#53B175]">Shop</span>
					</button>
					<button type="button" onClick={() => router.push("/explore")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><TbSearch className="h-6 w-6" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Explore</span>
					</button>
					<button type="button" onClick={() => router.push("/cart")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><IoCartOutline className="h-6 w-6" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Cart</span>
					</button>
					<button type="button" onClick={() => router.push("/favourites")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiHeart className="h-6 w-6" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Favorite</span>
					</button>
					<button type="button" onClick={() => router.push("/account")} className="flex flex-col items-center gap-1">
						<BottomNavIcon active={false}><FiUser className="h-6 w-6" /></BottomNavIcon>
						<span className="text-[12px] font-semibold text-[#7C7C7C]">Account</span>
					</button>
				</div>
			</nav>
		</div>
	);
}
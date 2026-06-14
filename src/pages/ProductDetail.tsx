"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { FaStar, FaHeart, FaRegHeart, FaShareSquare } from "react-icons/fa";
import Sidebar from "@/components/layout/Sidebar";
import { useCartStore } from "@/stores/cartStore";
import { useFavouritesStore } from "@/stores/favoriteStore";
import { products } from "@/data/products";
import { Product } from "@/types";

interface ProductDetailState {
	quantity: number;
	isFavourite: boolean;
	isDetailExpanded: boolean;
}

function StatusBar() {
	return (
		<div className="flex h-11 items-center justify-between px-6 pt-[4.83px] text-[#181725] md:hidden">
			<span className="text-sm font-medium leading-none">9:41</span>
			<div className="flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current" aria-hidden="true">
					<path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" />
				</svg>
				<svg viewBox="0 0 16 12" className="h-3 w-4 fill-current" aria-hidden="true">
					<path d="M8 10.5 6.6 9.1c1.6-1.6 4.2-1.6 5.8 0L11 10.5c-1-1-2.6-1-3.6 0zm-2.4-2.5L4.2 6.6c3-3 7.9-3 10.8 0l-1.4 1.4c-2.2-2.2-5.8-2.2-8 0zM1.5 5.1.1 3.7c4.3-4.2 11.3-4.2 15.6 0l-1.4 1.4c-3.5-3.4-9.3-3.4-12.8 0zM7.8 11.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
				</svg>
				<svg viewBox="0 0 24 12" className="h-3 w-6 fill-current" aria-hidden="true">
					<path d="M2 2h16v8H2V2zm18 3-2-1v4l2-1V5z" />
					<rect x="3.5" y="3.5" width="12.5" height="5" rx="1" />
				</svg>
			</div>
		</div>
	);
}

function BackArrow() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}

function ShareIcon() {
	return <FaShareSquare className="h-[18px] w-[18px] text-[#181725]" />;
}

function HeartButton({ active }: { active: boolean }) {
	return active ? <FaHeart className="h-6 w-6 text-[#4CAF82]" /> : <FaRegHeart className="h-6 w-6 text-[#181725]" />;
}

function ChevronDownIcon() {
	return <svg viewBox="0 0 10 14" className="h-[14px] w-[8.4px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 5 3 3 3-3" /></svg>;
}

function ChevronRightIcon() {
	return <svg viewBox="0 0 10 14" className="h-[14px] w-[8.4px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 2 4 5-4 5" /></svg>;
}

function ProductDots({ activeIndex, onChange }: { activeIndex: number; onChange: (index: number) => void }) {
	return (
		<div className="mt-3 flex items-center justify-center gap-2">
			{[0, 1, 2].map((index) => (
				<button
					key={index.toString()}
					type="button"
					onClick={() => onChange(index)}
					className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-5 bg-[#4CAF82]" : "w-2 bg-[#C4C4C4]"}`}
					aria-label={`Image ${index + 1}`}
				/>
			))}
		</div>
	);
}

function QuantitySelector({ quantity, onMinus, onPlus }: { quantity: number; onMinus: () => void; onPlus: () => void }) {
	return (
		<div className="flex h-[45.67px] w-[119.67px] items-center justify-between rounded-[17px] border border-[#E2E2E2] bg-white px-2">
			<button type="button" onClick={onMinus} className="text-[24px] leading-none text-[#181725]" aria-label="Decrease quantity">
				−
			</button>
			<span className="min-w-[30px] text-center font-poppins text-[18px] font-bold text-[#181725]">{quantity}</span>
			<button
				type="button"
				onClick={onPlus}
				className="flex h-[45.67px] w-[45.67px] items-center justify-center rounded-full bg-[#4CAF82] text-[20px] font-bold text-white"
				aria-label="Increase quantity"
			>
				+
			</button>
		</div>
	);
}

function StarRow() {
	return (
		<div className="flex items-center gap-1 text-[#F3603F]">
			{[0, 1, 2, 3, 4].map((index) => (
				<FaStar key={index.toString()} className="h-[14px] w-[14px]" />
			))}
		</div>
	);
}

function DetailAccordion({
	title,
	children,
	expanded,
	onToggle,
	chevronRight = false,
	onChevronClick,
}: {
	title: string;
	children: ReactNode;
	expanded?: boolean;
	onToggle?: () => void;
	chevronRight?: boolean;
	onChevronClick?: () => void;
}) {
	return (
		<div className="border-b border-[#E2E2E2] py-4">
			<div className="flex items-center justify-between gap-4" onClick={onToggle} role={onToggle ? "button" : undefined}>
				<span className="font-poppins text-[18px] font-semibold text-[#181725]">{title}</span>
				<div className="flex items-center gap-3 text-[#181725]">
					{chevronRight ? (
						<button type="button" onClick={onChevronClick} className="flex items-center" aria-label={`${title} details`}>
							<ChevronRightIcon />
						</button>
					) : null}
					{onToggle ? (
						<button type="button" className="flex items-center" aria-label={`${title} expand`}>
							<span className={`transition-transform ${expanded ? "rotate-180" : "rotate-0"}`}><ChevronDownIcon /></span>
						</button>
					) : null}
				</div>
			</div>
			<div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
				<div className="pt-3 font-poppins text-[14px] leading-[22px] text-[#7C7C7C]">{children}</div>
			</div>
		</div>
	);
}

function SidebarSpacer() {
	return <div className="hidden md:block md:w-[240px] md:flex-none" aria-hidden="true" />;
}

export default function ProductDetail() {
	const router = useRouter();
	const params = useParams<{ id?: string }>();
	const productId = params?.id ?? "p2";
	const product = useMemo<Product>(() => products.find((item) => item.id === productId) ?? products[1] ?? products[0], [productId]);
	const addToCart = useCartStore((state) => state.addToCart);
	const toggleFavouriteStore = useFavouritesStore((state) => state.toggle);
	const isFavouriteStore = useFavouritesStore((state) => state.isFavourite);

	const [state, setState] = useState<ProductDetailState>({
		quantity: 1,
		isFavourite: isFavouriteStore(product.id),
		isDetailExpanded: true,
	});
	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	const handleBack = (): void => {
		router.back();
	};

	const handleShare = (): void => {
		console.log(`Share product: ${product.name}`);
	};

	const handleFavouriteToggle = (): void => {
		toggleFavouriteStore(product);
		setState((current) => ({ ...current, isFavourite: !current.isFavourite }));
	};

	const handleQuantityMinus = (): void => {
		setState((current) => ({ ...current, quantity: Math.max(1, current.quantity - 1) }));
	};

	const handleQuantityPlus = (): void => {
		setState((current) => ({ ...current, quantity: current.quantity + 1 }));
	};

	const handleAddToBasket = (): void => {
		Array.from({ length: state.quantity }).forEach(() => addToCart(product));
	};

	const handleNutritionNavigate = (): void => {
		router.push(`/nutrition/${product.id}`);
	};

	const handleReviewsNavigate = (): void => {
		router.push(`/reviews/${product.id}`);
	};

	const desktopLayout = (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 md:ml-[240px] md:p-8">
				<div className="mx-auto max-w-7xl">
					<div className="flex flex-col gap-12 md:flex-row">
						<div className="md:sticky md:top-24 md:w-1/2 md:self-start">
							<div className="mb-4 flex justify-between">
								<button type="button" onClick={handleBack} className="text-[#181725]" aria-label="Go back">
									<BackArrow />
								</button>
								<button type="button" onClick={handleShare} className="text-[#181725]" aria-label="Share product">
									<ShareIcon />
								</button>
							</div>
							<div className="flex h-[400px] items-center justify-center bg-[#F8F8F8] rounded-2xl">
								<img src={product.image} alt={product.name} className="h-[320px] w-full object-contain" />
							</div>
							<ProductDots activeIndex={activeImageIndex} onChange={setActiveImageIndex} />
						</div>

						<div className="flex-1 md:w-1/2">
							<div className="flex flex-col gap-6">
								<div className="flex items-start justify-between gap-4">
									<div>
										<h1 className="font-poppins text-[28px] font-bold text-[#181725]">{product.name}</h1>
										<p className="mt-1 font-poppins text-[16px] text-[#7C7C7C]">{product.unit}, Price</p>
									</div>
									<button type="button" onClick={handleFavouriteToggle} aria-label="Toggle favourite">
										<HeartButton active={state.isFavourite} />
									</button>
								</div>

								<div className="flex items-center justify-between">
									<QuantitySelector quantity={state.quantity} onMinus={handleQuantityMinus} onPlus={handleQuantityPlus} />
									<span className="font-poppins text-[28px] font-bold text-[#181725]">${(product.price * state.quantity).toFixed(2)}</span>
								</div>

								<DetailAccordion title="Product Detail" expanded={state.isDetailExpanded} onToggle={() => setState((current) => ({ ...current, isDetailExpanded: !current.isDetailExpanded }))}>
									{product.description}
								</DetailAccordion>

								<div className="border-b border-[#E2E2E2] py-4">
									<div className="flex items-center justify-between gap-4">
										<span className="font-poppins text-[18px] font-semibold text-[#181725]">Nutritions</span>
										<div className="flex items-center gap-3 text-[#181725]">
											<span className="rounded-[5px] bg-[#EBF9F4] px-2 py-0.5 font-poppins text-[12px] text-[#4CAF82]">100gr</span>
											<button type="button" onClick={handleNutritionNavigate} aria-label="Go to nutrition">
												<ChevronRightIcon />
											</button>
										</div>
									</div>
								</div>

								<div className="border-b border-[#E2E2E2] py-4">
									<div className="flex items-center justify-between gap-4">
										<span className="font-poppins text-[18px] font-semibold text-[#181725]">Review</span>
										<div className="flex items-center gap-3">
											<StarRow />
											<button type="button" onClick={handleReviewsNavigate} aria-label="Go to reviews">
												<ChevronRightIcon />
											</button>
										</div>
									</div>
								</div>

								<button type="button" onClick={handleAddToBasket} className="mt-4 h-[67px] w-full rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white">
									Add To Basket
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);

	return (
		<div className="bg-white md:bg-[#FCFCFC]">
			<div className="md:hidden relative min-h-screen bg-white pb-[100px]">
				<StatusBar />

				<div className="flex justify-between px-6 pt-4 relative z-10">
					<button type="button" onClick={handleBack} className="text-[#181725]" aria-label="Go back">
						<BackArrow />
					</button>
					<button type="button" onClick={handleShare} className="text-[#181725]" aria-label="Share product">
						<ShareIcon />
					</button>
				</div>

				<div className="sticky top-0 z-10 bg-white px-10 py-4">
					<div className="flex h-[199px] items-center justify-center bg-white">
						<img src={product.image} alt={product.name} className="h-[199px] w-full object-contain" />
					</div>
					<ProductDots activeIndex={activeImageIndex} onChange={setActiveImageIndex} />
				</div>

				<div className="px-6 mt-4">
					<div className="flex items-start justify-between">
						<div>
							<h1 className="text-[24px] font-bold text-[#181725]">{product.name}</h1>
							<p className="mt-2 text-[16px] font-semibold text-[#7C7C7C]">{product.unit}, Price</p>
						</div>
						<button type="button" onClick={handleFavouriteToggle} aria-label="Toggle favourite">
							<HeartButton active={state.isFavourite} />
						</button>
					</div>

					<div className="mt-6 flex items-center justify-between">
						<QuantitySelector quantity={state.quantity} onMinus={handleQuantityMinus} onPlus={handleQuantityPlus} />
						<span className="font-poppins text-[24px] font-bold text-[#181725]">${(product.price * state.quantity).toFixed(2)}</span>
					</div>

					<div className="mt-6 border-t border-[#E2E2E2]" />

					<DetailAccordion title="Product Detail" expanded={state.isDetailExpanded} onToggle={() => setState((current) => ({ ...current, isDetailExpanded: !current.isDetailExpanded }))}>
						{product.description}
					</DetailAccordion>

					<div className="border-b border-[#E2E2E2] py-4">
						<div className="flex items-center justify-between gap-4">
							<span className="font-poppins text-[18px] font-semibold text-[#181725]">Nutritions</span>
							<div className="flex items-center gap-3">
								<span className="rounded-[5px] bg-[#EBF9F4] px-2 py-0.5 font-poppins text-[12px] text-[#4CAF82]">100gr</span>
								<button type="button" onClick={handleNutritionNavigate} aria-label="Go to nutrition">
									<ChevronRightIcon />
								</button>
							</div>
						</div>
					</div>

					<div className="border-b border-[#E2E2E2] py-4">
						<div className="flex items-center justify-between gap-4">
							<span className="font-poppins text-[18px] font-semibold text-[#181725]">Review</span>
							<div className="flex items-center gap-3">
								<StarRow />
								<button type="button" onClick={handleReviewsNavigate} aria-label="Go to reviews">
									<ChevronRightIcon />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="fixed bottom-5 left-0 right-0 z-50 px-6 md:hidden">
					<button type="button" onClick={handleAddToBasket} className="h-[67px] w-full rounded-[20px] bg-[#4CAF82] font-poppins text-[18px] font-semibold text-white">
						Add To Basket
					</button>
				</div>
			</div>

			<div className="hidden md:block">{desktopLayout}</div>
		</div>
	);
}

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

function StatusBar() {
	return (
		<div className="flex h-11 items-center justify-between bg-white px-6 pt-[4.83px] text-[#181725] md:hidden">
			<span className="text-sm font-medium leading-none">9:41</span>
			<div className="flex items-center gap-1.5">
				<svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current">
					<path d="M1 9h2v2H1V9zm3-3h2v5H4V6zm3-3h2v8H7V3zm3-2h2v10h-2V1zm3 3h2v7h-2V4z" />
				</svg>
			</div>
		</div>
	);
}

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
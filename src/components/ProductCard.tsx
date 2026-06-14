"use client";

import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const addToCart = useCartStore((state) => state.addToCart);

	return (
		<div className="flex w-[173px] flex-none flex-col rounded-[18px] border border-[#E2E2E2] p-[15px] transition-shadow hover:shadow-md">
			<Link href={`/product/${product.id}`} className="flex h-[100px] items-center justify-center">
				<img
					src={product.image}
					alt={product.name}
					className="max-h-full max-w-full object-contain"
				/>
			</Link>

			<div className="mt-4 flex flex-col gap-1">
				<Link href={`/product/${product.id}`}>
					<h3 className="line-clamp-1 font-poppins text-[16px] font-bold text-[#181725]">
						{product.name}
					</h3>
				</Link>
				<span className="font-poppins text-[14px] font-medium text-[#7C7C7C]">
					{product.unit}, Price
				</span>
			</div>

			<div className="mt-5 flex items-center justify-between">
				<span className="font-poppins text-[18px] font-semibold text-[#181725]">
					${product.price.toFixed(2)}
				</span>
				<button
					type="button"
					onClick={() => addToCart(product)}
					className="flex h-[45px] w-[45px] items-center justify-center rounded-[17px] bg-[#53B175] text-white transition-transform active:scale-90"
					aria-label={`Add ${product.name} to cart`}
				>
					<FiPlus size={24} />
				</button>
			</div>
		</div>
	);
}

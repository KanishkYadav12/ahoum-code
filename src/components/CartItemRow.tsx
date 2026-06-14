"use client";

import { useCartStore } from "@/stores/cartStore";
import { CartItem as StoreCartItem } from "@/types";

interface CartItemRowProps {
	item: StoreCartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeFromCart = useCartStore((state) => state.removeFromCart);

	const onIncrement = () => updateQuantity(item.product.id, item.quantity + 1);
	const onDecrement = () => {
		if (item.quantity > 1) {
			updateQuantity(item.product.id, item.quantity - 1);
		}
	};
	const onRemove = () => removeFromCart(item.product.id);

	return (
		<div className="relative flex min-h-[96.98px] items-center gap-3 border-b border-[#E2E2E2] py-3 pr-1">
			<button
				type="button"
				onClick={onRemove}
				className="absolute right-0 top-3 text-[#B8B8B8]"
				aria-label={`Remove ${item.product.name}`}
			>
				<svg
					viewBox="0 0 14 14"
					className="h-[14px] w-[14px]"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M3 3l8 8M11 3 3 11" />
				</svg>
			</button>

			<div className="flex h-[70px] w-[70px] flex-none items-center justify-center overflow-hidden rounded-[12px] bg-[#F4F4F4]">
				<img
					src={item.product.image}
					alt={item.product.name}
					className="h-[70px] w-[70px] object-contain"
				/>
			</div>

			<div className="min-w-0 flex-1">
				<h2 className="truncate font-poppins text-[16px] font-semibold text-[#181725]">
					{item.product.name}
				</h2>
				<p className="mt-1 font-poppins text-[14px] text-[#7C7C7C]">
					{item.product.unit}, Price
				</p>
				<div className="mt-2 flex items-center gap-2">
					<button
						type="button"
						onClick={onDecrement}
						className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] border border-[#E2E2E2] bg-white text-[16px] text-[#181725]"
						aria-label={`Decrease ${item.product.name}`}
					>
						−
					</button>
					<span className="w-7 text-center font-poppins text-[18px] font-semibold text-[#181725]">
						{item.quantity}
					</span>
					<button
						type="button"
						onClick={onIncrement}
						className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#4CAF82] text-[16px] font-bold text-white"
						aria-label={`Increase ${item.product.name}`}
					>
						+
					</button>
				</div>
			</div>

			<div className="flex h-full flex-none flex-col items-end justify-between pt-1">
				<span className="font-poppins text-[18px] font-semibold text-[#181725]">
					${(item.product.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	);
}

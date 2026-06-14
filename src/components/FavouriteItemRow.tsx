import type { Product } from "@/types";

interface FavouriteItemRowProps {
	item: Product;
	onClick: () => void;
}

export default function FavouriteItemRow({ item, onClick }: FavouriteItemRowProps) {
	return (
		<button type="button" onClick={onClick} className="flex w-full items-center gap-4 border-b border-[#E2E2E2] py-3 text-left">
			<div className="ml-8 flex h-[54.9px] w-[30.91px] flex-none items-center justify-center overflow-hidden bg-transparent">
				<img src={item.image} alt={item.name} className="h-[54.9px] w-[30.91px] object-contain" />
			</div>

			<div className="min-w-0 flex-1">
				<h2 className="truncate font-poppins text-[16px] font-semibold text-[#181725]">{item.name}</h2>
				<p className="mt-1 font-poppins text-[14px] text-[#7C7C7C]">{item.description}</p>
			</div>

			<div className="flex flex-none items-center gap-2 pr-1">
				<span className="font-poppins text-[16px] font-semibold text-[#181725]">${item.price.toFixed(2)}</span>
				<span className="text-[14px] text-[#181725]">›</span>
			</div>
		</button>
	);
}

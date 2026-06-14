import type { Category } from "@/data/categoriesData";

interface ExploreCategoryCardProps {
	category: Category;
	onClick: () => void;
}

export default function ExploreCategoryCard({ category, onClick }: ExploreCategoryCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{ backgroundColor: category.backgroundColor }}
			className="flex h-[189px] w-full flex-col justify-between overflow-hidden rounded-[18px] p-4 text-left transition-transform hover:scale-[1.02] md:h-[220px]"
		>
			<div className="flex flex-1 items-start justify-center overflow-hidden">
				<img src={category.image} alt={category.name} className="h-[120px] w-[140px] object-contain md:h-[130px] md:w-[150px]" />
			</div>
			<p className="whitespace-pre-line font-poppins text-[18px] font-bold leading-[22px] text-[#181725]">{category.name}</p>
		</button>
	);
}

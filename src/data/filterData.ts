import { ProductCategory } from "@/types";

export interface FilterOption {
	id: ProductCategory | string;
	label: string;
}

export const categoryFilters: FilterOption[] = [
	{ id: ProductCategory.DairyEggs, label: "Eggs" },
	{ id: ProductCategory.BakerySnacks, label: "Noodles & Pasta" },
	{ id: ProductCategory.BakerySnacks, label: "Chips & Crisps" },
	{ id: ProductCategory.FreshFruits, label: "Fast Food" },
];

export const brandFilters: FilterOption[] = [
	{ id: "Individual Collection", label: "Individual Collection" },
	{ id: "Cocola", label: "Cocola" },
	{ id: "Ifad", label: "Ifad" },
	{ id: "Kazi Farmas", label: "Kazi Farmas" },
];

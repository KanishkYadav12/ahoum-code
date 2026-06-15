import { ProductCategory } from "@/types";

export interface FilterOption {
	id: ProductCategory | string;
	label: string;
}

export const categoryFilters: FilterOption[] = [
	{ id: ProductCategory.DairyEggs,     label: "Dairy & Eggs" },
	{ id: ProductCategory.BakerySnacks,  label: "Bakery & Snacks" },
	{ id: ProductCategory.FreshFruits,   label: "Fresh Fruits" },
	{ id: ProductCategory.Vegetables,    label: "Vegetables" },
	{ id: ProductCategory.CookingOil,    label: "Cooking Oil" },
	{ id: ProductCategory.MeatFish,      label: "Meat & Fish" },
	{ id: ProductCategory.Beverages,     label: "Beverages" },
	{ id: ProductCategory.Nutritions,    label: "Nutritions" },
];

export const brandFilters: FilterOption[] = [
	{ id: "Individual Collection", label: "Individual Collection" },
	{ id: "Cocola",                label: "Cocola" },
	{ id: "Ifad",                  label: "Ifad" },
	{ id: "Kazi Farmas",           label: "Kazi Farmas" },
];
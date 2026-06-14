export interface FilterOption {
	id: number;
	label: string;
}

export const categoryFilters: FilterOption[] = [
	{ id: 1, label: "Eggs" },
	{ id: 2, label: "Noodles & Pasta" },
	{ id: 3, label: "Chips & Crisps" },
	{ id: 4, label: "Fast Food" },
];

export const brandFilters: FilterOption[] = [
	{ id: 1, label: "Individual Callection" },
	{ id: 2, label: "Cocola" },
	{ id: 3, label: "Ifad" },
	{ id: 4, label: "Kazi Farmas" },
];

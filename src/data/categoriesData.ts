export interface Category {
	id: number;
	name: string;
	backgroundColor: string;
	image: string;
}

export const categories: Category[] = [
	{ id: 1, name: "Frash Fruits\n& Vegetable", backgroundColor: "#F4FFF4", image: "https://placehold.co/140x120?text=Category" },
	{ id: 2, name: "Cooking Oil\n& Ghee", backgroundColor: "#FFF9F0", image: "https://placehold.co/140x120?text=Category" },
	{ id: 3, name: "Meat & Fish", backgroundColor: "#FFF0F0", image: "https://placehold.co/140x120?text=Category" },
	{ id: 4, name: "Bakery & Snacks", backgroundColor: "#F5F0FF", image: "https://placehold.co/140x120?text=Category" },
	{ id: 5, name: "Dairy & Eggs", backgroundColor: "#FFFEF0", image: "https://placehold.co/140x120?text=Category" },
	{ id: 6, name: "Beverages", backgroundColor: "#F0F8FF", image: "https://placehold.co/140x120?text=Category" },
	{ id: 7, name: "Frozen Foods", backgroundColor: "#F0FFFF", image: "https://placehold.co/140x120?text=Category" },
	{ id: 8, name: "Personal Care", backgroundColor: "#FFF0F9", image: "https://placehold.co/140x120?text=Category" },
	{ id: 9, name: "Breakfast", backgroundColor: "#FFFAF0", image: "https://placehold.co/140x120?text=Category" },
	{ id: 10, name: "Spices & Herbs", backgroundColor: "#F5FFF0", image: "https://placehold.co/140x120?text=Category" },
];

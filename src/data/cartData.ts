export interface CartItem {
	id: number;
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: string;
}

export const initialCartItems: CartItem[] = [
	{ id: 1, name: "Bell Pepper Red", description: "1kg, Price", price: 4.99, quantity: 1, image: "https://placehold.co/70x70?text=Item" },
	{ id: 2, name: "Egg Chicken Red", description: "4pcs, Price", price: 1.99, quantity: 1, image: "https://placehold.co/70x70?text=Item" },
	{ id: 3, name: "Organic Bananas", description: "12kg, Price", price: 3.0, quantity: 1, image: "https://placehold.co/70x70?text=Item" },
	{ id: 4, name: "Ginger", description: "250gm, Price", price: 2.99, quantity: 1, image: "https://placehold.co/70x70?text=Item" },
];

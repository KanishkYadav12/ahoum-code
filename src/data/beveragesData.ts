export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
}

export const beverages: Product[] = [
	{ id: 1, name: "Diet Coke", description: "355ml, Price", price: 1.99, image: "https://placehold.co/150x120?text=Product" },
	{ id: 2, name: "Sprite Can", description: "325ml, Price", price: 1.5, image: "https://placehold.co/150x120?text=Product" },
	{ id: 3, name: "Apple & Grape Juice", description: "2L, Price", price: 15.99, image: "https://placehold.co/150x120?text=Product" },
	{ id: 4, name: "Orenge Juice", description: "2L, Price", price: 15.99, image: "https://placehold.co/150x120?text=Product" },
	{ id: 5, name: "Coca Cola Can", description: "325ml, Price", price: 4.99, image: "https://placehold.co/150x120?text=Product" },
	{ id: 6, name: "Pepsi Can", description: "330ml, Price", price: 4.99, image: "https://placehold.co/150x120?text=Product" },
];

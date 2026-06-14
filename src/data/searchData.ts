export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	categoryId: number;
	brandId: number;
}

export const allProducts: Product[] = [
	{ id: 1, name: "Egg Chicken Red", description: "4pcs, Price", price: 1.99, image: "https://placehold.co/150x120?text=Product", categoryId: 1, brandId: 2 },
	{ id: 2, name: "Egg Chicken White", description: "180g, Price", price: 1.5, image: "https://placehold.co/150x120?text=Product", categoryId: 1, brandId: 1 },
	{ id: 3, name: "Egg Pasta", description: "30gm, Price", price: 15.99, image: "https://placehold.co/150x120?text=Product", categoryId: 2, brandId: 4 },
	{ id: 4, name: "Egg Noodles", description: "2L, Price", price: 15.99, image: "https://placehold.co/150x120?text=Product", categoryId: 2, brandId: 2 },
	{ id: 5, name: "Mayonnais Eggless", description: "200g, Price", price: 4.99, image: "https://placehold.co/150x120?text=Product", categoryId: 4, brandId: 1 },
	{ id: 6, name: "Egg Noodles", description: "2L, Price", price: 4.99, image: "https://placehold.co/150x120?text=Product", categoryId: 2, brandId: 2 },
];

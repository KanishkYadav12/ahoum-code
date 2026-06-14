export interface FavouriteItem {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
}

export const favouriteItems: FavouriteItem[] = [
	{ id: 1, name: "Sprite Can", description: "325ml, Price", price: 1.5, image: "https://placehold.co/31x55?text=Item" },
	{ id: 2, name: "Diet Coke", description: "355ml, Price", price: 1.99, image: "https://placehold.co/31x55?text=Item" },
	{ id: 3, name: "Apple & Grape Juice", description: "2L, Price", price: 15.5, image: "https://placehold.co/31x55?text=Item" },
	{ id: 4, name: "Coca Cola Can", description: "325ml, Price", price: 4.99, image: "https://placehold.co/31x55?text=Item" },
	{ id: 5, name: "Pepsi Can", description: "330ml, Price", price: 4.99, image: "https://placehold.co/31x55?text=Item" },
];

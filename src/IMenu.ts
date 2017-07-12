export interface IMeal {
	name: string;
	price: string;
}

export interface IMenuSection {
	name?: string;
	meals: IMeal[]
}

export interface IRestaurant {
	id: string;
	name: string;
	url: string;
}

interface IMenu {
	restaurant: IRestaurant;
	menus: IMenuSection[]
}

export default IMenu;
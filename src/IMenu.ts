/**
 * Interface representing one meal
 */
export interface IMeal {
	name: string;
	price: string;
}

/**
 * Menu section
 */
export interface IMenuSection {
	name?: string;
	meals: IMeal[]
}

interface IPosition {
	lat: string;
	lng: string;
}

/**
 * Restaurant info
 */
export interface IRestaurant {
	id: string;
	name: string;
	url: string;
	position: IPosition
}

/**
 * Complete day menu for the restaurant
 */
interface IMenu {
	restaurant: IRestaurant;
	menus: IMenuSection[]
}

export default IMenu;
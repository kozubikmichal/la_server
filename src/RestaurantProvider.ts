import restaurants from "./data/restaurants"
import { IRestaurant } from "./IMenu"

export default class RestaurantProvider {
	getRestaurants(): Promise<IRestaurant[]> {
		return Promise.resolve(
			Object.keys(restaurants).map((key) => {
				return restaurants[key]
			})
		);
	}
}

declare var Promise: any;
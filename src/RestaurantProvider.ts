import restaurants from "./data/restaurants"
import { IRestaurant } from "./IMenu"

/**
 * Restaurant provider
 */
export default class RestaurantProvider {
	/**
	 * Gets data for all restaurants
	 */
	getRestaurants(): Promise<IRestaurant[]> {
		return Promise.resolve(
			Object.keys(restaurants).map((key) => {
				return restaurants[key]
			})
		);
	}
}

declare var Promise: any;
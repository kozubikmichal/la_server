import { Provides } from "typescript-ioc"
import { IRestaurant } from "./IMenu"

import IRestaurantProvider from "./IRestaurantProvider";

import restaurants from "./data/restaurants"

/**
 * Restaurant provider
 */
@Provides(IRestaurantProvider)
export default class RestaurantProvider extends IRestaurantProvider {
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
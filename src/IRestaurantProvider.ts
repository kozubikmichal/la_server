import { IRestaurant } from "./IMenu"

/**
 * Restaurant provider
 */
export default abstract class IRestaurantProvider {
	/**
	 * Gets data for all restaurants
	 */
	abstract getRestaurants(): Promise<IRestaurant[]>
}

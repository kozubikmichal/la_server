import IMenu from "./IMenu";

/**
 * Provides menu for the restaurants
 */
export default abstract class IMenuProvider {
	/**
	 * Gets today menus for all restaurants
	 */
	abstract getMenusToday(): Promise<IMenu[]>

	/**
	 * Gets today menu for one restaurant
	 * @param restaurantId restaurant id
	 */
	abstract getMenuToday(restaurantId: string): Promise<IMenu>
}

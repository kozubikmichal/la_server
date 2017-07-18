import ISource from "./ISource";

/**
 * Sources manager
 */
export default abstract class ISourcesManager {
	/**
	 * Gets data for all sources
	 */
	abstract getSources(): ISource[]

	/**
	 * Gets data for one restaurant
	 * @param restaurantId restaurant id
	 */
	abstract getSource(restaurantId: string): ISource
};

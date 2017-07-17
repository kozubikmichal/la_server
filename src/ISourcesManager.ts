import ISource from "./ISource";

/**
 * Sources manager
 */
interface ISourcesManager {
	/**
	 * Gets data for all sources
	 */
	getSources(): ISource[]

	/**
	 * Gets data for one restaurant
	 * @param restaurantId restaurant id
	 */
	getSource(restaurantId: string): ISource
};

export default ISourcesManager;
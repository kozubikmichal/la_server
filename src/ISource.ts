import IParser from "./parsers/IParser";
import { IRestaurant } from "./IMenu";

/**
 * Data source
 */
interface ISource {
	restaurant: IRestaurant;
	menuUrl: string;
	parser: IParser
}

export default ISource;
import IParser from "./parsers/IParser";
import { IRestaurant } from "./IMenu";

interface ISource {
	restaurant: IRestaurant;
	menuUrl: string;
	parser: IParser
}

export default ISource;
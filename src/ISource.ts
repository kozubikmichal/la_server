import IParser from "./parsers/IParser";
import { IRestaurant, MenuType } from "./IMenu";
import IPDFInfoProvider from "./pdfProviders/IPDFInfoProvider";

/**
 * Data source
 */
interface ISource {
	restaurant: IRestaurant;
	menuUrl: string;
	type: MenuType;
	parser?: IParser;
	pdfInfoProvider?: IPDFInfoProvider;
}

export default ISource;
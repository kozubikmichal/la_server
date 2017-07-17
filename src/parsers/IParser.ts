import { IMenuSection } from "../IMenu";
import * as jsdom from "jsdom";

/**
 * Menu parser interface
 */
interface IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param {jsdom.JSDOM} dom dom parser
	 * @param {number} day day number
	 * @returns {Promise<IMenuSection[]>} promise that resolves when menu is parsed
	 */
	parseDay(dom: jsdom.JSDOM, day: number): Promise<IMenuSection[]>
}

export default IParser;
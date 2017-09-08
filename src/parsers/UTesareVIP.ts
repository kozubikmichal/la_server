import IParser from "./IParser";
import { IMeal } from "../IMenu";

import Base from "./UTesareBase";

import * as jsdom from "jsdom";
import * as pdfreader from "pdfreader";

/**
 * U Tesare restaurant menu parser
 */
export default class UTesareVIP extends Base {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number, data: any) {
		return this.downloadMenu()
			.then(() => this.parsePdfMenu())
			.then(menu => {
				return [{
					meals: this.processVIPMenu(menu)
				}];
			})
	}

	private processVIPMenu(rows: string[]): IMeal[] {
		let index = this.indexOfRow(rows, "V.I.P.") + 1;
		let meals: IMeal[] = [];
		let meal = "";

		while (index < rows.length) {
			meal = `${meal} ${rows[index++]}`.trim();

			let priceIndex = meal.search(UTesareVIP.REGEX_PRICE);
			if (priceIndex !== -1) {
				meals.push({
					name: this.normalizeName(meal.substr(0, priceIndex)),
					price: meal.substr(priceIndex)
				});

				meal = "";
			}
		}

		return meals;
	}
}

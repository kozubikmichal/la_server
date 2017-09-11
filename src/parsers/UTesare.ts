import Base from "./UTesareBase";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

import * as pdfreader from "pdfreader";

/**
 * U Tesare restaurant menu parser
 */
export default class UTesare extends Base {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number, data: any) {
		return this.downloadMenu()
			.then(menu => this.parsePdfMenu(menu))
			.then(menu => {
				return [{
					meals: this.processDayMenu(menu, day - 1)
				}];
			})
	}

	private processDayMenu(rows: string[], day: number): IMeal[] {
		let index = this.indexOfRow(rows, UTesare.DAY_SEPARATOR[day]) + 1;
		let meals: IMeal[] = [];
		let meal = "";

		meals.push({
			name: rows[index++],
			price: ""
		})

		while (!meal.startsWith(UTesare.DAY_SEPARATOR[day + 1])) {
			meal = `${meal} ${rows[index++]}`.trim();

			if (meal.startsWith("Sladké")) {
				meal = "";
				continue;
			}

			let mealIndex = meal.search(UTesare.REGEX_MEAL_INDEX);
			let saladIndex = meal.search("Salát:");
			let priceIndex = meal.search(UTesare.REGEX_PRICE);

			if ((mealIndex !== -1 || saladIndex !== -1) && priceIndex !== -1) {
				meals.push({
					name: this.normalizeName(meal.substr(0, priceIndex)),
					price: meal.substr(priceIndex)
				})

				meal = "";
			}

			if (mealIndex === -1 && saladIndex === -1 && priceIndex === -1) {
				break;
			}
		}

		return meals;
	}
}

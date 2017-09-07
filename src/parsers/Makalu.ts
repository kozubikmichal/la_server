import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

/**
 * Makalu restaurant menu parser
 */
export default class Makalu implements IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let daysData: Element[] = [];
		let days = dom.window.document.querySelectorAll(`.TJden`);

		for (let i = 0; i < days.length; ++i) {
			daysData.push(days.item(i).nextElementSibling);
		}

		return Promise.resolve([{
			meals: this.processMenuList(days.item(day - 1).nextElementSibling)
		}]);
	}

	private processMenuList(dayData: Element): IMeal[] {
		let meals = [];

		let mainMeals = dayData.getElementsByTagName("b");

		meals.push({
			name: dayData.textContent.substr(0, dayData.textContent.indexOf("Cena")),
			price: ""
		});

		for (let i = 0; i < mainMeals.length; ++i) {
			let data = mainMeals.item(i);

			let price = data.getElementsByClassName("cena").item(0).innerHTML;
			let name = data.textContent.replace(price, "");
			let description = data.nextSibling.textContent;

			meals.push({
				name: this.normalizeName(name, description),
				price: this.normalizePrice(price)
			})
		}

		return meals;
	}

	private normalizeName(name: string, description: string): string {
		let normalizedName = name.replace(/^\d+\./, "");

		return `${normalizedName.trim()} (${description.trim()})`;
	}

	private normalizePrice(price: string): string {
		return price.replace(/ .+$/, ",-");
	}
}

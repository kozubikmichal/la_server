import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

/**
 * Tusto restaurant menu parser
 */
export default class Tusto implements IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let menu = dom.window.document.querySelectorAll(`table.menu`).item(day - 1);
		let dayData = menu.children.item(0);

		return Promise.resolve([{
			meals: this.processMenuList(dayData)
		}]);
	}

	private processMenuList(list: Element): IMeal[] {
		let meals = [];
		for (let i = 1; i < list.children.length; ++i) {
			let row = list.children[i];
			meals.push({
				name: this.normalizeName(row.children[0].textContent),
				price: this.normalizePrice(row.children[2].textContent)
			});
		}
		return meals;
	}

	private normalizeName(name: string): string {
		return name.replace(/^\d+\)\s*/, "").trim();
	}

	private normalizePrice(price: string): string {
		return price.replace("Kč", "").trim()
	}
}

declare var Promise: any;
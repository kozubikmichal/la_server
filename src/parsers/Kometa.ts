import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

const DAY_IDS = [
	"po",
	"ut",
	"st",
	"ct",
	"pa",
]

/**
 * Kometa restaurant menu parser
 */
export default class Kometa implements IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let divId = `menu-day-${DAY_IDS[day - 1]}`;
		let dayData = dom.window.document.querySelectorAll(`div#${divId} tr`);

		return Promise.resolve([{
			meals: this.processMenuList(dayData)
		}]);
	}

	private processMenuList(list: NodeListOf<Element>): IMeal[] {
		let meals = [];
		for (let i = 1; i < list.length; ++i) {
			let row = list.item(i);
			meals.push({
				name: this.normalizeName(row.children[1].textContent),
				price: row.children[2].textContent
			});
		}
		return meals;
	}

	private normalizeName(name: string): string {
		return name.trim();
	}
}

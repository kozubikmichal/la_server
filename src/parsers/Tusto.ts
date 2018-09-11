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
	 */
	public parseDay(dom: jsdom.JSDOM) {
		let index = this.getDayIndex(dom);
		let menu = dom.window.document.querySelectorAll(`table.menu`).item(index);
		let dayData = menu.children.item(0);

		return Promise.resolve([{
			meals: this.processMenuList(dayData)
		}]);
	}

	private getDayIndex(dom: jsdom.JSDOM): number {
		let now = new Date();
		let regex = new RegExp(`\\s${now.getDate()}\.${now.getMonth() + 1}\.`);
		let dates = dom.window.document.querySelectorAll("table.menu > tbody > tr:first-child > td:first-child");
		let dayIndex = 0;

		for (let i = 0; i < dates.length; ++i) {
			if (dates.item(i).textContent.search(regex) > -1) {
				dayIndex = i;
				break;
			}
		}

		return dayIndex;
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

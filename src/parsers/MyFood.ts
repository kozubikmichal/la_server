import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

/**
 * MyFood restaurant menu parser
 */
export default class MyFood implements IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let soupIndex = (day - 1) * 2;
		let allData = dom.window.document.querySelectorAll(`div.item`);

		return Promise.resolve([{
			meals: this.processMenuList(allData.item(soupIndex)).concat(
				this.processMenuList(allData.item(soupIndex + 1))
			)
		}]);
	}

	private processMenuList(list: Element): IMeal[] {
		let meals = [];
		let data = list.children[1];
		for (let i = 0; i < data.children.length; ++i) {
			meals.push({
				name: data.children[i].children[0].textContent,
				price: this.normalizePrice(data.children[i].children[1].textContent)
			});
		}
		return meals;
	}

	private normalizePrice(price: string): string {
		return price.replace(" Kč", ",-");
	}
}

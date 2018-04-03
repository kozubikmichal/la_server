import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

/**
 * IQ restaurant menu parser
 */
export default class IQ implements IParser {
	/**
	 * Constructor
	 *
	 * @param isWeek true if weekly menu is required
	 */
	constructor(private isWeek: boolean = false) { }

	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM) {
		let days = dom.window.document.querySelectorAll("dl.menuDayItems");
		let itemIndex = this.isWeek ? (days.length - 1) : this.getDayIndex(dom);
		let data = days.item(itemIndex);

		return Promise.resolve([{
			meals: this.processMenuList(data)
		}]);
	}

	private getDayIndex(dom: jsdom.JSDOM): number {
		let date = String((new Date()).getDate());
		let dates = dom.window.document.querySelectorAll("div.date");
		let dateIndex = 0;

		for (let i = 0; i < dates.length; ++i) {
			if (dates.item(i).children[0].textContent === date) {
				console.log("TADAAA");
				dateIndex = i;
				break;
			}
		}

		return dateIndex * 2;
	}

	private processMenuList(list: Element): IMeal[] {
		let meals = [];
		let mainMealIndex = 1;

		for (let i = 0; i < list.children.length; i += 2) {
			list.children[i].removeChild(list.children[i].children[0]);

			meals.push({
				name: list.children[i].textContent,
				price: this.normalizePrice(list.children[i + 1].textContent)
			});
		}
		return meals;
	}

	private normalizePrice(price: string): string {
		return price.replace(/\(.*\)/, "").trim();
	}
}

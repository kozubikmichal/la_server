import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

/**
 * U Hoveziho pupku restaurant menu parser
 */
export default class UHovezihoPupku implements IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let menus = dom.window.document.querySelectorAll("table.menu_den")
		let dayMenu = menus.item(day + 1);
		let weekMenu = menus.item(menus.length - 1);

		return Promise.resolve([{
			meals: this.processMenuList(dayMenu)
		}, {
			name: "Stálé jídlo na menu",
			meals: this.processMenuList(weekMenu)
		}]);
	}

	private processMenuList(list: Element): IMeal[] {
		let meals = [];

		let names = list.querySelectorAll(".menu_jidlo_text");
		let prices = list.querySelectorAll(".menu_jidlo_cena");

		for (let i = 0; i < names.length; ++i) {
			meals.push({
				name: names.item(i).textContent,
				price: prices.item(i).textContent
			});
		}
		return meals;
	}
}

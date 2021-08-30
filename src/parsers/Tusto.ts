import IParser from "./IParser";
import { IMeal, IMenuSection } from "../IMenu";

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
	public parseDay(dom: jsdom.JSDOM): Promise<IMenuSection[]> {
		const sections = dom.window.document.querySelectorAll(".weekly-list");

		return Promise.resolve([{
			name: "Denní menu",
			meals: this.processSoupList(dom)
				.concat(
					this.processMenuList(sections.item(0))
				)
		}, {
			name: "Týdenní menu",
			meals: this.processMenuList(sections.item(1))
		}]);
	}

	private processSoupList(dom: jsdom.JSDOM): IMeal[] {
		const meals = [];
		const soups = dom.window.document.querySelectorAll(".soap .soap-list li");
		console.log(soups);

		soups.forEach((soup) => {
			meals.push({
				name: soup.children[0].childNodes[0].textContent,
				price: soup.children[1].textContent
			} as IMeal)
		})

		return meals;
	}

	private processMenuList(menuSection: Element): IMeal[] {
		const meals = [];
		const items = menuSection.querySelectorAll("li");

		items.forEach((item) => {
			meals.push({
				name: item.children[1].childNodes[0].textContent,
				price: item.children[2].textContent
			} as IMeal);
		})

		return meals;
	}
}

import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

export default class Kometa implements IParser {
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let dayData = dom.window.document.querySelectorAll(`div#div${day} tr`);

		return Promise.resolve([{
			meals: this.processMenuList(dayData)
		}]);
	}

	private processMenuList(list: NodeListOf<Element>): IMeal[] {
		let meals = [];
		for (let i = 1; i < list.length; ++i) {
			let row = list.item(i);
			meals.push({
				name: this.normalizeName(row.children[0].textContent),
				price: row.children[1].textContent
			});
		}
		return meals;
	}

	private normalizeName(name: string): string {
		return name.trim();
	}
}

declare var Promise: any;
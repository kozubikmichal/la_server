import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

export default class IQ implements IParser {
	constructor(private isWeek: boolean = false) { }

	public parseDay(dom: jsdom.JSDOM, day: number) {
		let days = dom.window.document.querySelectorAll("dl.menuDayItems");
		let itemIndex = this.isWeek ? ((day - 1) * 2 + 1) : ((day - 1) * 2);
		let data = days.item(itemIndex);

		return [{
			meals: this.processMenuList(data)
		}];
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
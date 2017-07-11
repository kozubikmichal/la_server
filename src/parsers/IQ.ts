import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

export default class IQ implements IParser {
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let days = dom.window.document.querySelectorAll("dl.menuDayItems");
		let dayData = days.item(day * 2 - 1);
		let weekData = days.item(day * 2);

		return [{
			meals: this.processMenuList(dayData)
		}, {
			name: "Týdenní nabídka",
			meals: this.processMenuList(weekData)
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
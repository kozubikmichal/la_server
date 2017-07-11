import IParser from "./IParser";
import { IMeal } from "../IMenu";

import * as jsdom from "jsdom";

export default class Rebio implements IParser {
	public parseDay(dom: jsdom.JSDOM, day: number) {
		let date = new Date();
		date.setDate(date.getDate() + (day - date.getDay()));

		let id = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
		let dayHeader = dom.window.document.querySelector(`h3[id='${id}']`);

		return [{
			meals: this.getMeals(dayHeader)
		}];
	}

	private getMeals(dayHeader: Element): IMeal[] {
		return dayHeader ? this.processMenuList(dayHeader.nextElementSibling) : [];
	}

	private processMenuList(list: Element): IMeal[] {
		let meals = [];
		for (let i = 0; i < list.children.length; ++i) {
			let row = list.children[i];
			meals.push({
				name: row.children[0].textContent,
				price: ""
			});
		}
		return meals;
	}
}
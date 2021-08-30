import IParser from "./IParser";
import { IMeal, IMenuSection } from "../IMenu";

import * as jsdom from "jsdom";

enum Position {
	Other,
	Soup,
	MainCourse
}

interface DeterminationResult {
	newPosition: Position;
	offset: number;
}

/**
 * U Tesaře restaurant menu parser
 */
export default class UTesare implements IParser {
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 */
	public parseDay(dom: jsdom.JSDOM): Promise<IMenuSection[]> {
		const items = dom.window.document.querySelectorAll(".elementor-text-editor")[1].children;
		const meals = [];
		let position: Position;

		for (let i = 0; i < items.length; ++i) {
			const item = items.item(i);

			if (item.tagName.toUpperCase() !== "P") {
				let result = this.determinePosition(item);
				position = result.newPosition;
				i += result.offset;
				continue;
			}

			switch (position) {
				case Position.Soup:
				case Position.MainCourse: {
					meals.push(this.parseMeal(item));
					break;
				}
				default: continue
			}
		}
		return Promise.resolve([{
			meals: meals
		}]);
	}

	private determinePosition(item: Element): DeterminationResult {
		switch (item.textContent.trim()) {
			case "Polévky": return {
				newPosition: Position.Soup,
				offset: 1
			};
			case "Hlavní chody": return {
				newPosition: Position.MainCourse,
				offset: 0
			};
			default: return {
				newPosition: Position.Other,
				offset: 0
			};
		}
	}

	private parseMeal(item: Element): IMeal {
		const text = item.textContent.trim();
		const priceStart = text.search(/\d+,-/)

		return {
			name: text.substring(0, priceStart).trim(),
			price: text.substring(priceStart).trim()
		};
	}
}

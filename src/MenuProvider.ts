import IParser from "./parsers/IParser";
import { IMenuSection } from "./IMenu";
import IMenu from "./IMenu";

import SourcesManager from "./SourcesManager";

import Request from "./Request";
import * as jsdom from "jsdom";

const { JSDOM } = jsdom;


export default class MenuProvider {
	private sourcesManager = new SourcesManager();

	getMenusToday(): Promise<IMenu[]> {
		return Promise.all(
			this.sourcesManager.getSources().map((source) => {
				return this.parseMenuToday(source.menuUrl, source.parser).then(menus => {
					return {
						restaurant: source.restaurant,
						menus: menus
					}
				})
			})
		)
	}

	getMenuToday(restaurantId: string): Promise<IMenu> {
		let source = this.sourcesManager.getSource(restaurantId);
		if (!source) {
			return Promise.resolve({
				restaurant: {
					id: "",
					name: "unknown",
					url: ""
				},
				menus: []
			});
		}
		return this.parseMenuToday(source.menuUrl, source.parser).then((menus) => {
			return {
				restaurant: source.restaurant,
				menus: menus
			}
		});
	}

	private parseMenu(url: string, parser: IParser, day: number): Promise<IMenuSection[]> {
		return Request.get(url).then((data) => {
			let dom = new JSDOM(data);
			return parser.parseDay(dom, day);
		})
	}

	private parseMenuToday(url: string, parser: IParser): Promise<IMenuSection[]> {
		return this.parseMenu(url, parser, (new Date()).getDay());
	}
}

declare var Promise: any;
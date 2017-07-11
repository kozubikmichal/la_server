import IParser from "./parsers/IParser";
import { IMenuSection } from "./IMenu";
import IMenu from "./IMenu";

import SourcesManager from "./SourcesManager";

import Request from "./Request";
import * as jsdom from "jsdom";

const { JSDOM } = jsdom;


export default class MenuProvider {
	private sourcesManager = new SourcesManager();

	getAllMenusToday(): Promise<IMenu[]> {
		return Promise.all(
			this.sourcesManager.getSources().map((source) => {
				return this.getMenuToday(source.menuUrl, source.parser).then(menus => {
					return {
						restaurant: {
							name: source.name,
							url: source.url
						},
						menus: menus
					}
				})
			})
		)
	}

	getMenu(url: string, parser: IParser, day: number): Promise<IMenuSection[]> {
		return Request.get(url).then((data) => {
			let dom = new JSDOM(data);
			return parser.parseDay(dom, day);
		})
	}

	getMenuToday(url: string, parser: IParser): Promise<IMenuSection[]> {
		return this.getMenu(url, parser, (new Date()).getDay());
	}
}

declare var Promise: any;
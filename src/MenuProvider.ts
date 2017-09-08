import { Inject, Provides } from "typescript-ioc"
import { IMenuSection } from "./IMenu";

import IParser from "./parsers/IParser";
import IMenu from "./IMenu";

import IMenuProvider from "./IMenuProvider";
import ISourcesManager from "./ISourcesManager";
import IRequest from "./IRequest";

import * as jsdom from "jsdom";

const { JSDOM } = jsdom;

/**
 * Provides menu for the restaurants
 */
@Provides(IMenuProvider)
export default class MenuProvider implements IMenuProvider {
	constructor(
		@Inject private sourcesManager?: ISourcesManager,
		@Inject private request?: IRequest
	) { }

	/**
	 * Gets today menus for all restaurants
	 */
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

	/**
	 * Gets today menu for one restaurant
	 * @param restaurantId restaurant id
	 */
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
		return this.request.get(url).then((data) => {
			let dom = new JSDOM(data);
			return parser.parseDay(dom, day, data);
		})
	}

	private parseMenuToday(url: string, parser: IParser): Promise<IMenuSection[]> {
		return this.parseMenu(url, parser, (new Date()).getDay());
	}
}

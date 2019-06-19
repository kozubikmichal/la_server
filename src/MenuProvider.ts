import { Inject, Provides } from "typescript-ioc"
import { IMenuSection, MenuType } from "./IMenu";

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
				}).catch(() => {
					return null;
				})
			}).filter(Boolean)
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
					url: "",
					position: {
						lat: "",
						lng: ""
					}
				},
				menus: [],
				type: MenuType.Standard
			});
		}

		switch (source.type) {
			case MenuType.PDF: {
				return source.pdfInfoProvider.getDayInfo(this.getTodayDay()).then((info) => {
					return {
						restaurant: source.restaurant,
						menus: [],
						type: MenuType.PDF,
						pdfInfo: info
					}
				})
			}
			default: {
				return this.parseMenuToday(source.menuUrl, source.parser).then((menus) => {
					return {
						restaurant: source.restaurant,
						menus: menus,
						type: MenuType.Standard
					}
				});
			}
		}
	}

	private parseMenu(url: string, parser: IParser, day: number): Promise<IMenuSection[]> {
		let dataPromise = url.length > 0 ? this.request.get(url) : Promise.resolve()

		return dataPromise.then((data) => {
			let dom = new JSDOM(data);
			return parser.parseDay(dom, day, data);
		})
	}

	private parseMenuToday(url: string, parser: IParser): Promise<IMenuSection[]> {
		return this.parseMenu(url, parser, this.getTodayDay());
	}

	private getTodayDay(): number {
		return new Date().getDay();
	}
}

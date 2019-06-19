import { IMeal, IMenuSection } from "../IMenu";

import * as jsdom from "jsdom";
import IParser from "./IParser";
import { Inject } from "typescript-ioc";
import IRequest from "../IRequest";

const DAILY_MENU_URL = "https://developers.zomato.com/api/v2.1/dailymenu";
const USER_KEY = "b0a94ba965b2a1bbcdfc59d1632e0a6d";

interface IZomatoMenu {
	daily_menus: {
		daily_menu: {
			daily_menu_id: string,
			start_date: string,
			end_date: string,
			name: string,
			dishes: {
				dish: {
					dish_id: string,
					name: string,
					price: string
				}
			}[]
		}
	}[],
	status: string
}

/**
 * U Tesare restaurant menu parser
 */
export default class Zomato implements IParser {
	@Inject
	private request: IRequest;

	constructor(
		private restaurantId: string
	) { }
	/**
	 * Parses menu for the given day
	 *
	 * @param dom dom parser
	 * @param day day number
	 */
	public parseDay(dom: jsdom.JSDOM, day: number, data: any) {
		return this.downloadMenu()
			.then(data => this.parse(data));
	}

	private downloadMenu() {
		return this.request.get(DAILY_MENU_URL, {
			params: {
				res_id: this.restaurantId
			},
			headers: {
				accept: "application/json",
				user_key: USER_KEY
			}
		})
	}

	private parse(menu: IZomatoMenu): IMenuSection[] {
		return menu.daily_menus.map(dailyMenu => {
			return {
				name: dailyMenu.daily_menu.name,
				meals: dailyMenu.daily_menu.dishes.map(dish => {
					return {
						name: dish.dish.name,
						price: dish.dish.price
					}
				})
			};
		});
	}
}

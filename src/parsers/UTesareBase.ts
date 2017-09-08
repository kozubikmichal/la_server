import { Inject } from "typescript-ioc";
import IRequest from "../IRequest";

import IParser from "./IParser";

import * as jsdom from "jsdom";
import * as pdfreader from "pdfreader";

const MENU_URL = "http://www.utesare.cz/Menu.pdf";
const FILE_PATH = "./utesare.pdf";

/**
 * U Tesare restaurant menu parser
 */
export default class UTesare implements IParser {
	@Inject
	private request: IRequest;

	protected static REGEX_PRICE = /\d+,-$/;
	protected static REGEX_MEAL_INDEX = /^\d+\./;
	protected static DAY_SEPARATOR = [
		"PONDĚLÍ",
		"ÚTERÝ",
		"STŘEDA",
		"ČTVRTEK",
		"PÁTEK",
		"Doba "
	]

	/**
	 * Parses menu for the given day
	 */
	public parseDay(dom: jsdom.JSDOM, day: number, data: any) {
		return Promise.resolve([]);
	}

	protected parsePdfMenu(): Promise<string[]> {
		return new Promise((resolve, reject) => {
			let rows = {};

			let processRows = () => {
				let data = Object.keys(rows)
					.sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
					.map((y) => (rows[y] || []).join(""))

				if (data.length) {
					resolve(data);
				}
			}

			new pdfreader.PdfReader().parseFileItems(FILE_PATH, (err, item) => {
				if (!item || item.page) {
					processRows();
					rows = {};
				} else if (item.text) {
					(rows[item.y] = rows[item.y] || []).push(item.text);
				}
			});
		})
	}

	protected downloadMenu(): Promise<any> {
		return this.request.download(MENU_URL, FILE_PATH);
	}

	protected indexOfRow(rows: string[], content: string): number {
		let index = rows.findIndex((row) => row === content);

		return index !== -1 ? index : rows.length;
	}

	protected normalizeName(name: string): string {
		return name.replace(/^\d+\./, "").trim();
	}

	protected normalizePrice(price: string): string {
		return price.replace(/ .+$/, ",-");
	}
}

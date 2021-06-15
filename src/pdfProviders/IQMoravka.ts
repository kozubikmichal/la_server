import { Inject } from "typescript-ioc";
import { IRestaurant, IPDFInfo } from "../IMenu"
import IRequest from "../IRequest";

import IPDFInfoProvider from "./IPDFInfoProvider";

const BaseUrl = "http://www.iqrestaurant.cz/moravka";
const DaysMapping = [
	"01 PONDĚLÍ",
	"02 ÚTERÝ",
	"03 STŘEDA",
	"04 ČTVRTEK",
	"05 PÁTEK"
]

/**
 * Restaurant provider
 */
export default class IQMoravka extends IPDFInfoProvider {
	@Inject
	private request: IRequest;

	constructor(private restaurant: IRestaurant) {
		super();
	}

	public async getDayInfo(day: number): Promise<IPDFInfo> {
		const url = `${BaseUrl}/${encodeURIComponent(DaysMapping[day - 1])}.pdf`;

		return {
			url: url,
			pages: [1],
			content: await this.request.get(url, {
				responseType: "arraybuffer"
			})
		};
	}
}

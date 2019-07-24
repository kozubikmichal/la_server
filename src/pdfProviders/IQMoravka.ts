import { Provides } from "typescript-ioc"
import { IRestaurant, IPDFInfo } from "../IMenu"

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
@Provides(IPDFInfoProvider)
export default class IQMoravka extends IPDFInfoProvider {
	constructor(private restaurant: IRestaurant) {
		super();
	}

	public async getDayInfo(day: number): Promise<IPDFInfo> {
		return {
			url: `${BaseUrl}/${encodeURIComponent(DaysMapping[day - 1])}.pdf`,
			pages: [1]
		};
	}
}

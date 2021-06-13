import { IRestaurant, IPDFInfo } from "../IMenu"

import IPDFInfoProvider from "./IPDFInfoProvider";

/**
 * Restaurant provider
 */
export default class Eatology extends IPDFInfoProvider {
	constructor(private restaurant: IRestaurant) {
		super();
	}

	public async getDayInfo(day: number): Promise<IPDFInfo> {
		return {
			url: this.restaurant.url,
			pages: [day * 2 - 1]
		} as IPDFInfo;
	}
}

import { IRestaurant, IPDFInfo } from "../IMenu"

import IPDFInfoProvider from "./IPDFInfoProvider";

/**
 * Restaurant provider
 */
export default class SinglePage extends IPDFInfoProvider {
	constructor(private restaurant: IRestaurant) {
		super();
	}

	public async getDayInfo(): Promise<IPDFInfo> {
		return {
			url: this.restaurant.url,
			pages: [1]
		} as IPDFInfo;
	}
}

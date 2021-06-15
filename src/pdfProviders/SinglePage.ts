import { Inject } from "typescript-ioc";
import { IRestaurant, IPDFInfo } from "../IMenu"
import IRequest from "../IRequest";

import IPDFInfoProvider from "./IPDFInfoProvider";

/**
 * Restaurant provider
 */
export default class SinglePage extends IPDFInfoProvider {
	@Inject
	private request: IRequest;

	constructor(private restaurant: IRestaurant) {
		super();
	}

	public async getDayInfo(): Promise<IPDFInfo> {
		return {
			url: this.restaurant.url,
			pages: [1],
			content: await this.request.get(this.restaurant.url, {
				responseType: "arraybuffer"
			})
		} as IPDFInfo;
	}
}

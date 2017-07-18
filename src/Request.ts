import { Provides } from "typescript-ioc"

import IRequest from "./IRequest";
import axios from "axios";

/**
 * Request wrapper
 */
@Provides(IRequest)
export default class Request extends IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 */
	public get(url): Promise<any> {
		return axios.get(url, {
			proxy: {
				host: "proxy.wdf.sap.corp",
				port: 8080
			}
		}).then((response) => {
			return response.data
		});
	}
}
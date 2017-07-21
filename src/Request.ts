import { Provides } from "typescript-ioc"
import Constants from "./Constants";
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
		// Default usage is from corporate network -> use proxy
		return axios.get(url, {
			proxy: {
				host: Constants.ProxyHost,
				port: Constants.ProxyPort
			}
		}).catch(error => {
			// In case of error try to perform request wihout proxy setting
			if (error.code === "ENOTFOUND") {
				return axios.get(url);
			} else {
				return Promise.reject(error);
			}
		}).then((response) => {
			return response.data
		});
	}
}
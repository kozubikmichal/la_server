import { Provides } from "typescript-ioc"
import Constants from "./Constants";
import IRequest, { IRequestConfig } from "./IRequest";

import axios from "axios";
import * as http from "http";

/**
 * Request wrapper
 */
@Provides(IRequest)
export default class Request extends IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 * @param params request parameters
	 */
	public get(url, config: IRequestConfig = {}): Promise<any> {
		// Default usage is from corporate network -> use proxy
		return axios.get(url, Object.assign({
			proxy: {
				host: Constants.ProxyHost,
				port: Constants.ProxyPort
			}
		}, config)).catch(() => {
			// In case of error try to perform request wihout proxy setting
			return axios.get(url, config);
		}).then((response) => {
			return response.data
		});
	}

	public download(url): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			let processResponse = (response: http.IncomingMessage) => {
				let body = [];

				response.on("data", data => {
					body.push(data);
				}).on("end", () => {
					resolve(Buffer.concat(body));
				})
			}

			http.get({
				host: Constants.ProxyHost,
				port: Constants.ProxyPort,
				path: url
			}, processResponse
			).on("error", error => {
				if (error.name === "ENOTFOUND") {
					http.get(url, processResponse).on("error", error => reject(error));
				} else {
					reject(error);
				}
			})
		})
	}
}
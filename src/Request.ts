import { Provides } from "typescript-ioc"
import Constants from "./Constants";
import IRequest from "./IRequest";

import axios from "axios";
import * as http from "http";
import * as fs from "fs";
import * as stream from "stream";

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
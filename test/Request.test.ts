import { Container } from "typescript-ioc";

import axios from "axios"
import { AxiosResponse } from "axios";

import Request from "../src/Request";
import Constants from "../src/Constants";

import "mocha";
import * as assert from "assert";

describe("Request", () => {
	let origGet;
	let request: Request;

	beforeEach(() => {
		origGet = axios.get;
		request = Container.get(Request);
	})

	afterEach(() => {
		axios.get = origGet;
	})

	it("get", () => {
		let testUrl = "URL";

		axios.get = (url: string, settings: any): Promise<AxiosResponse> => {
			let response: AxiosResponse = {
				status: 200,
				statusText: "OK",
				data: "DATA",
				headers: {},
				config: null
			}

			assert.strictEqual(url, testUrl, "Url set");
			assert.deepEqual(settings.proxy, {
				host: Constants.ProxyHost,
				port: Constants.ProxyPort
			}, "Proxy set")

			return Promise.resolve(response)
		}

		return request.get(testUrl).then((data) => {
			assert.strictEqual(data, "DATA");
		})
	})
})

import axios from "axios";

export default class Request {
	public static get(url): Promise<any> {
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
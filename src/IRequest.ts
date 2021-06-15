import { AxiosRequestConfig } from "axios";

/**
 * Request wrapper
 */
export default abstract class IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 * @param params request parameters
	 */
	abstract get(url, config?: AxiosRequestConfig): Promise<any>

	abstract download(url): Promise<Buffer>
}
export interface IRequestConfig {
	params?: {
		[key: string]: string
	},
	headers?: {
		[key: string]: string
	}
}

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
	abstract get(url, config?: IRequestConfig): Promise<any>

	abstract download(url): Promise<Buffer>
}
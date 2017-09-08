/**
 * Request wrapper
 */
export default abstract class IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 */
	abstract get(url): Promise<any>

	abstract download(url, filePath): Promise<any>
}
/**
 * Request wrapper
 */
interface IRequest {
	/**
	 * Sends GET request
	 *
	 * @param url url path
	 */
	get(url): Promise<any>
}

export default IRequest;
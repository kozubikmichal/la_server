import IRequest from "../../src/IRequest";

export default class FakeRequest extends IRequest {
	public get(url: string): Promise<any> {
		return Promise.resolve("<html></html>")
	}
}

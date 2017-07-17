import IRequest from "../../src/IRequest";

export default class FakeRequest implements IRequest {
	public get(url: string): Promise<any> {
		return Promise.resolve("<html></html>")
	}
}

declare var Promise: any;
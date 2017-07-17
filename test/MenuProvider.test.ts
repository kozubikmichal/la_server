import MenuProvider from "../src/MenuProvider";
import FakeSourcesManager from "./fakes/FakeSourceManager";
import FakeRequest from "./fakes/FakeRequest";

import "mocha";

import * as sinon from "sinon";
import * as assert from "assert";

describe("MenuProvider", () => {
	it("getMenusToday", () => {
		let sourcesManager = new FakeSourcesManager();
		let provider = new MenuProvider(sourcesManager, new FakeRequest());

		return provider.getMenusToday().then((data) => {
			assert.strictEqual(data.length, sourcesManager.sources.length, "All sources parsed");
		})
	})
})

declare var Promise: any;
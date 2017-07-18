import { Container } from "typescript-ioc";

import MenuProvider from "../src/MenuProvider";

import IRequest from "../src/IRequest";
import ISourcesManager from "../src/ISourcesManager";

import FakeSourcesManager from "./fakes/FakeSourceManager";
import FakeRequest from "./fakes/FakeRequest";

import "mocha";
import * as assert from "assert";

describe("MenuProvider", () => {
	let provider: MenuProvider

	before(() => {
		Container.bind(IRequest).to(FakeRequest);
		Container.bind(ISourcesManager).to(FakeSourcesManager);
	})

	beforeEach(() => {
		provider = Container.get(MenuProvider);
	})

	it("getMenusToday", () => {
		return provider.getMenusToday().then((data) => {
			assert.strictEqual(data.length, FakeSourcesManager.sources.length, "All sources parsed");
		})
	})

	it("getMenuToday", () => {
		return Promise.all(
			FakeSourcesManager.sources.map(src => {
				return provider.getMenuToday(src.restaurant.id).then(data => {
					assert.deepEqual(src.restaurant, data.restaurant, "Correct restaurant");
				})
			})
		)
	})
})

declare var Promise: any;
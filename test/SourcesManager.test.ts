import { Container } from "typescript-ioc";

import SourcesManager from "../src/SourcesManager";
import IParser from "../src/parsers/IParser";

import data from "../src/data/restaurants";

import "mocha";
import * as assert from "assert";

describe("SourcesManager", () => {
	let manager: SourcesManager;

	beforeEach(() => {
		manager = Container.get(SourcesManager);
	})

	it("getSources", () => {
		manager.getSources().forEach((source, index) => {
			assert.ok(source.parser, `${index}: parser created`)
			assert.ok(source.menuUrl, `${index}: menuUrl set`)
			assert.ok(source.restaurant, `${index}: restaurant associated`)
		})
	})

	it("getSource", () => {
		Object.keys(data).forEach(entry => {
			assert.strictEqual(entry, manager.getSource(entry).restaurant.id, `${entry} found`);
		})
	})
})

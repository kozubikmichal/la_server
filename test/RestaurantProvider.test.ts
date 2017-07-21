import { Container } from "typescript-ioc";

import data from "../src/data/restaurants";
import RestaurantProvider from "../src/RestaurantProvider";

import "mocha";
import * as assert from "assert";

describe("RestaurantProvider", () => {
	let provider: RestaurantProvider;

	before(() => {
	})

	beforeEach(() => {
		provider = Container.get(RestaurantProvider);
	})

	it("getRestaurants", () => {
		return provider.getRestaurants().then((restaurants) => {
			let keys = Object.keys(data);

			assert.strictEqual(keys.length, restaurants.length, "Correct count");

			keys.forEach(key => {
				assert.ok(restaurants.find((r) => r.id === key), `${key} found`)
			})
		})
	})
})

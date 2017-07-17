import ISourcesManager from "../../src/ISourcesManager";
import IParser from "../../src/parsers/IParser";
import ISource from "../../src/ISource";

let fakeRestaurant = {
	url: "url",
	name: "name",
	id: "id"
}

export class DummyParser implements IParser {
	parseDay() {
		return Promise.resolve([{
			meals: []
		}]);
	}
}

export default class FakeSourcesManager implements ISourcesManager {
	public sources = [{
		menuUrl: "firstUrl",
		parser: new DummyParser(),
		restaurant: fakeRestaurant,
	}, {
		menuUrl: "secondUrl",
		parser: new DummyParser(),
		restaurant: fakeRestaurant
	}];

	getSources(): ISource[] {
		return this.sources;
	}

	getSource(restaurantId: string): ISource {
		return this.sources[0];
	}
}

declare var Promise: any;
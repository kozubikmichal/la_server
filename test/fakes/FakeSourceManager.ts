import ISourcesManager from "../../src/ISourcesManager";
import IParser from "../../src/parsers/IParser";
import ISource from "../../src/ISource";

export class DummyParser implements IParser {
	parseDay() {
		return Promise.resolve([{
			meals: []
		}]);
	}
}

export default class FakeSourcesManager extends ISourcesManager {
	public static sources = [{
		menuUrl: "firstUrl",
		parser: new DummyParser(),
		restaurant: {
			id: "id1",
			name: "name1",
			url: "url1"
		},
	}, {
		menuUrl: "secondUrl",
		parser: new DummyParser(),
		restaurant: {
			id: "id2",
			name: "name2",
			url: "url2"
		}
	}];

	getSources(): ISource[] {
		return FakeSourcesManager.sources;
	}

	getSource(id: string): ISource {
		return FakeSourcesManager.sources.filter((s) => s.restaurant.id === id)[0];
	}
}

declare var Promise: any;
import ISource from "./ISource";

import IQ from "./parsers/IQ";
import Kometa from "./parsers/Kometa";
import Tusto from "./parsers/Tusto";
import Rebio from "./parsers/Rebio";
import MyFood from "./parsers/MyFood";

import restaurants from "./data/restaurants"

export default class SourcesManager {
	private sources: ISource[] = [{
		restaurant: restaurants.iqHolandska,
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		parser: new IQ()
	}, {
		restaurant: restaurants.iqHolandskaWeek,
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		parser: new IQ(true)
	}, {
		restaurant: restaurants.myFoodHolandska,
		menuUrl: "http://www.sklizeno.cz/o-nas/brno-holandska/",
		parser: new MyFood()
	}, {
		restaurant: restaurants.tustoTitanium,
		menuUrl: "http://titanium.tusto.cz/tydenni-menu/",
		parser: new Tusto()
	}, {
		restaurant: restaurants.kometaPubArena,
		menuUrl: "http://arena.kometapub.cz/tydenni-menu.php",
		parser: new Kometa()
	}, {
		restaurant: restaurants.rebioHolandska,
		menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
		parser: new Rebio()
	}]

	getSources(): ISource[] {
		return this.sources;
	}

	getSource(restaurantId: string): ISource {
		return this.getSources().filter((source) => {
			return source.restaurant.id === restaurantId;
		})[0];
	}
}

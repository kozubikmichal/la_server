import ISource from "./ISource";
import ISourcesManager from "./ISourcesManager";

import Kometa from "./parsers/Kometa";
import Tusto from "./parsers/Tusto";
import Rebio from "./parsers/Rebio";
import MyFood from "./parsers/MyFood";
import UHovezihoPupku from "./parsers/UHovezihoPupku";
import Eatology from "./pdfProviders/Eatology";

import restaurants from "./data/restaurants"
import { MenuType } from "./IMenu";
import SinglePage from "./pdfProviders/SinglePage";
import Zomato from "./parsers/Zomato";
import IQMoravka from "./pdfProviders/IQMoravka";
import UTesare from "./parsers/UTesare";

/**
 * Sources manager
 */
export default class SourcesManager implements ISourcesManager {
	private sources: ISource[] = [{
		restaurant: restaurants.iqHolandska,
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		type: MenuType.PDF,
		pdfInfoProvider: new Eatology(restaurants.iqHolandska)
	}, {
		restaurant: restaurants.myFoodHolandska,
		menuUrl: "http://www.sklizeno.cz/o-nas/brno-holandska/",
		type: MenuType.Standard,
		parser: new MyFood()
	}, {
		restaurant: restaurants.tustoTitanium,
		menuUrl: "http://titanium.tusto.cz/tydenni-menu/",
		type: MenuType.Standard,
		parser: new Tusto()
	}, {
		restaurant: restaurants.kometaPubArena,
		menuUrl: "https://www.kometapub.cz/arena.php",
		type: MenuType.Standard,
		parser: new Kometa()
	}, {
		restaurant: restaurants.rebioHolandska,
		menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
		type: MenuType.Standard,
		parser: new Rebio()
	}, {
		restaurant: restaurants.uHovezihoPupku,
		menuUrl: "http://www.uhovezihopupku.cz/menu/",
		type: MenuType.Standard,
		parser: new UHovezihoPupku()
	}, {
		restaurant: restaurants.uTesare,
		menuUrl: "http://www.utesare.cz/poledni-nabidka/",
		type: MenuType.Standard,
		parser: new UTesare()
	}, {
		restaurant: restaurants.buffaloAmericanSteakhouse,
		menuUrl: "",
		type: MenuType.Standard,
		parser: new Zomato("18491544")
	}, {
		restaurant: restaurants.iqMoravka,
		menuUrl: "http://www.iqrestaurant.cz/moravka.html?iframe=true",
		type: MenuType.PDF,
		pdfInfoProvider: new IQMoravka(restaurants.iqMoravka)
	}]

	/**
	 * Gets data for all sources
	 */
	getSources(): ISource[] {
		return this.sources;
	}

	/**
	 * Gets data for one restaurant
	 * @param restaurantId restaurant id
	 */
	getSource(restaurantId: string): ISource {
		return this.getSources().filter((source) => {
			return source.restaurant.id === restaurantId;
		})[0];
	}
}

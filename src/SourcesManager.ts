import { Provides } from "typescript-ioc"
import ISource from "./ISource";
import ISourcesManager from "./ISourcesManager";

import Kometa from "./parsers/Kometa";
import Tusto from "./parsers/Tusto";
import Rebio from "./parsers/Rebio";
import MyFood from "./parsers/MyFood";
import Makalu from "./parsers/Makalu";
import UTesare from "./parsers/UTesare";
import UTesareVIP from "./parsers/UTesareVIP";
import UHovezihoPupku from "./parsers/UHovezihoPupku";
import Eatology from "./pdfProviders/Eatology";

import restaurants from "./data/restaurants"
import { MenuType } from "./IMenu";
import SinglePage from "./pdfProviders/SinglePage";

/**
 * Sources manager
 */
@Provides(ISourcesManager)
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
		menuUrl: "https://arena.kometapub.cz/tydenni-menu.php",
		type: MenuType.Standard,
		parser: new Kometa()
	}, {
		restaurant: restaurants.rebioHolandska,
		menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
		type: MenuType.Standard,
		parser: new Rebio()
	}, {
		restaurant: restaurants.makaluBrno,
		menuUrl: "http://www.nepalska-restaurace-makalu.cz/index.php",
		type: MenuType.Standard,
		parser: new Makalu()
	}, {
		restaurant: restaurants.uHovezihoPupku,
		menuUrl: "http://www.uhovezihopupku.cz/menu/",
		type: MenuType.Standard,
		parser: new UHovezihoPupku()
	}, {
		restaurant: restaurants.uTesare,
		menuUrl: "http://www.utesare.cz/Menu.pdf",
		type: MenuType.PDF,
		pdfInfoProvider: new SinglePage(restaurants.uTesare)
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

import { Provides } from "typescript-ioc"
import ISource from "./ISource";
import ISourcesManager from "./ISourcesManager";

import IQ from "./parsers/IQ";
import Kometa from "./parsers/Kometa";
import Tusto from "./parsers/Tusto";
import Rebio from "./parsers/Rebio";
import MyFood from "./parsers/MyFood";
import Spilberk from "./parsers/Spilberk";
import Makalu from "./parsers/Makalu";
import UTesare from "./parsers/UTesare";
import UTesareVIP from "./parsers/UTesareVIP";
import UHovezihoPupku from "./parsers/UHovezihoPupku";

import restaurants from "./data/restaurants"

/**
 * Sources manager
 */
@Provides(ISourcesManager)
export default class SourcesManager implements ISourcesManager {
	private sources: ISource[] = [{
		restaurant: restaurants.iqHolandska,
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		parser: new IQ()
	}, {
		restaurant: restaurants.iqHolandskaWeek,
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		parser: new IQ(true)
	}, {
		restaurant: restaurants.utesare,
		menuUrl: "http://www.utesare.cz/Menu.pdf",
		parser: new UTesare()
	}
		// , {
		// 	restaurant: restaurants.utesareVIP,
		// 	menuUrl: "http://www.utesare.cz/Menu.pdf",
		// 	parser: new UTesareVIP()
		// }
		, {
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
		restaurant: restaurants.spilberkCafe,
		menuUrl: "http://www.spielberkcafe.cz/denni_menu.html",
		parser: new Spilberk()
	}, {
		restaurant: restaurants.rebioHolandska,
		menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
		parser: new Rebio()
	}, {
		restaurant: restaurants.makaluBrno,
		menuUrl: "http://www.nepalska-restaurace-makalu.cz/index.php",
		parser: new Makalu()
	}, {
		restaurant: restaurants.uHovezihoPupku,
		menuUrl: "http://www.uhovezihopupku.cz/menu/",
		parser: new UHovezihoPupku()
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

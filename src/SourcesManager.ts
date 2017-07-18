import { Provides } from "typescript-ioc"
import ISource from "./ISource";
import ISourcesManager from "./ISourcesManager";

import IQ from "./parsers/IQ";
import Kometa from "./parsers/Kometa";
import Tusto from "./parsers/Tusto";
import Rebio from "./parsers/Rebio";
import MyFood from "./parsers/MyFood";
import Spilberk from "./parsers/Spilberk";

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

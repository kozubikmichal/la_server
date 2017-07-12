import ISource from "./ISource";

import IQ from "./parsers/IQ";
import Kometa from "./parsers/Kometa";
import Tusto from "./parsers/Tusto";
import Rebio from "./parsers/Rebio";
import MyFood from "./parsers/MyFood";

export default class SourcesManager {
	private sources: ISource[] = [{
		name: "IQ Holandská",
		url: "http://iqrestaurant.cz/brno/menu.html",
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		parser: new IQ()
	}, {
		name: "IQ Holandská (Týdenní nabídka)",
		url: "http://iqrestaurant.cz/brno/menu.html",
		menuUrl: "http://iqrestaurant.cz/brno/getData.svc?type=brnoMenuHTML2",
		parser: new IQ(true)
	}, {
		name: "MyFood Holandská",
		url: "https://www.sklizeno.cz/o-nas/brno-holandska/",
		menuUrl: "http://www.sklizeno.cz/o-nas/brno-holandska/",
		parser: new MyFood()
	}, {
		name: "Tusto Titanium",
		url: "http://titanium.tusto.cz/tydenni-menu/",
		menuUrl: "http://titanium.tusto.cz/tydenni-menu/",
		parser: new Tusto()
	}, {
		name: "Kometa Pub Arena",
		url: "http://arena.kometapub.cz/tydenni-menu.php",
		menuUrl: "http://arena.kometapub.cz/tydenni-menu.php",
		parser: new Kometa()
	}, {
		name: "Rebio Holandská",
		url: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
		menuUrl: "http://www.rebio.cz/Holandska/Nase-nabidka/dW-ei.folder.aspx",
		parser: new Rebio()
	}]

	getSources(): ISource[] {
		return this.sources;
	}
}

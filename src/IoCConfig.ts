import { Container, Scope } from "typescript-ioc"

import IMenuProvider from "./IMenuProvider";
import MenuProvider from "./MenuProvider";

import IRestaurantProvider from "./IRestaurantProvider";
import RestaurantProvider from "./RestaurantProvider";

import ISourcesManager from "./ISourcesManager";
import SourcesManager from "./SourcesManager";

import IRequest from "./IRequest";
import Request from "./Request";
import IVisitorsRepository from "./db/IVisitorsRepository";
import VisitorsRepository from "./db/VisitorsRepository";
import IDAO from "./db/IDAO";
import AppDAO from "./db/AppDAO";

export default class Configuration {
	static configure() {
		Container.bind(IMenuProvider).to(MenuProvider)
		Container.bind(ISourcesManager).to(SourcesManager)
		Container.bind(IRequest).to(Request);
		Container.bind(IRestaurantProvider).to(RestaurantProvider);
		Container.bind(IVisitorsRepository).to(VisitorsRepository);

		Container.bind(IDAO).provider({
			get: () => {
				return new AppDAO("./database.sqlite3")
			}
		}).scope(Scope.Singleton);
	}
}
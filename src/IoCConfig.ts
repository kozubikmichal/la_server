import { Container } from "typescript-ioc"

import IMenuProvider from "./IMenuProvider";
import MenuProvider from "./MenuProvider";

import IRestaurantProvider from "./IRestaurantProvider";
import RestaurantProvider from "./RestaurantProvider";

import ISourcesManager from "./ISourcesManager";
import SourcesManager from "./SourcesManager";

import IRequest from "./IRequest";
import Request from "./Request";

export default class Configuration {
	static configure() {
		Container.bind(IMenuProvider).to(MenuProvider)
		Container.bind(ISourcesManager).to(SourcesManager)
		Container.bind(IRequest).to(Request);
		Container.bind(IRestaurantProvider).to(RestaurantProvider);
	}
}
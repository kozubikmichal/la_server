import { Inject } from "typescript-ioc"

import IMenuProvider from "./IMenuProvider";
import IRestaurantProvider from "./IRestaurantProvider";

import * as express from "express";
import * as apicache from "apicache";
import * as path from "path";

const CACHE_DURATION = "30 minutes"
const API_ROOT = "/api"
const ROUTES = {
	menu: "/menu",
	singleMenu: "/menu/:id",
	restaurant: "/restaurant",
	clearCache: "/clearCache"
}

/**
 * Server
 */
export default class Server {
	private app = express();
	private router = express.Router();

	constructor(
		@Inject private menuProvider: IMenuProvider,
		@Inject private restaurantProvider: IRestaurantProvider
	) {
		this.useCache();
		this.useRouter();
		this.registerClient();
		this.registerRoutes();
	}

	/**
	 * Starts server on the given port
	 *
	 * @param port port number
	 */
	public start(port: number) {
		this.app.listen(port);
		this.app.use((error, req, res, next) => {
			console.log(req.url);
			next();
		})
		this.app.use((req, res, next) => {
			console.log(req.url);
			next();
		})
		console.log("done");
	}

	private registerRoutes() {
		this.router
			.get(ROUTES.singleMenu, (req, res) => {
				this.menuProvider.getMenuToday(req.params.id).then((data) => {
					res.json(data)
				});
			})
			.get(ROUTES.menu, (req, res) => {
				this.menuProvider.getMenusToday().then((data) => {
					res.json(data);
				})
			})
			.get(ROUTES.clearCache, (req, res) => {
				apicache.clear();
				res.end();
			})
			.get(ROUTES.restaurant, (req, res) => {
				this.restaurantProvider.getRestaurants().then((data) => {
					res.json(data);
				})
			})
	}

	private useCache() {
		this.app.use(API_ROOT,
			apicache.middleware(CACHE_DURATION, (req, res) => {
				return res.statusCode === 200;
			})
		)
	}

	private useRouter() {
		this.app.use(API_ROOT, this.router);
	}

	private registerClient() {
		this.app.use(express.static(__dirname + '/../client'))
		this.app.get("/", (req, res) => {
			let file = path.join(__dirname, "/../client/public/index.html");
			res.sendFile(file)
		})
	}
}
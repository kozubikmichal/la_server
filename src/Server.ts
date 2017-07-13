import MenuProvider from "./MenuProvider";
import RestaurantProvider from "./RestaurantProvider";

import * as express from "express";
import * as apicache from "apicache";
import * as path from "path";

import restaurants from "./data/restaurants"

const CACHE_DURATION = "30 minutes"
const API_ROOT = "/api"
const ROUTES = {
	menu: "/menu",
	singleMenu: "/menu/:id",
	restaurant: "/restaurant",
	clearCache: "/clearCache"
}

export default class Server {
	private menuProvider = new MenuProvider();
	private restaurantProvider = new RestaurantProvider();

	private app = express();
	private router = express.Router();

	constructor() {
		this.useCache();
		this.useRouter();
		this.registerClient();
		this.registerRoutes();
	}

	public start(port: number) {
		this.app.listen(port);
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
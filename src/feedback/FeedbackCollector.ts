import { Inject } from "typescript-ioc"

import * as express from "express";
import FeedbackRepository from "../db/FeedbackRepository";
import sameOrigin from "../security/sameOrigin";

const FEEDBACK_ROOT = "/feedback"
const ROUTES = {
	contact: "/contact",
	addRestaurant: "/addRestaurant",
	getAll: "/"
}

/**
 * Server
 */
export default class FeedbackCollector {
	private router = express.Router();
	private app: express.Express;

	constructor(
		@Inject private feedbackRepository: FeedbackRepository
	) {
		this.feedbackRepository.createTable();
	}

	/**
	 * Starts server on the given port
	 *
	 * @param port port number
	 */
	public register(app: express.Express) {
		this.app = app;

		this.router.use(sameOrigin());
		this.useRouter();
		this.registerRoutes();
	}

	private registerRoutes() {
		this.router
			.post(ROUTES.contact, async (req, res) => {
				await this.feedbackRepository.commit({
					Name: req.body.name,
					Note: req.body.note
				});

				res.sendStatus(201);
			})
			.post(ROUTES.addRestaurant, async (req, res) => {
				await this.feedbackRepository.commit({
					Name: req.body.name,
					Note: req.body.note,
					RestaurantName: req.body.restaurantName,
					RestaurantUrl: req.body.restaurantUrl
				});

				res.sendStatus(201);
			})
	}

	private useRouter() {
		this.app.use(FEEDBACK_ROOT, this.router);
	}
}
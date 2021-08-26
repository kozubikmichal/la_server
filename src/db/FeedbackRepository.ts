import { Inject } from "typescript-ioc";
import IDAO from "./IDAO";

const TableName = "feedback";

export interface FeedbackItem {
	Name?: string;
	RestaurantName?: string;
	RestaurantUrl?: string;
	Note?: string;
}

export default class FeedbackRepository {
	constructor(
		@Inject private dao: IDAO
	) { }

	async createTable(): Promise<any> {
		return this.dao.run(`
			CREATE TABLE IF NOT EXISTS ${TableName} (
				Id INTEGER PRIMARY KEY AUTOINCREMENT,
				Name varchar(255),
				RestaurantName varchar(255),
				RestaurantUrl varchar(255),
				Note varchar(255),
				Timestamp datetime
			);
		`);
	}

	async commit(feedback: FeedbackItem): Promise<any> {
		this.dao.run(`
			INSERT INTO ${TableName} (Name, RestaurantName, RestaurantUrl, Note, Timestamp) VALUES (?, ?, ?, ?, ?)
		`, [
			feedback.Name || "",
			feedback.RestaurantName || "",
			feedback.RestaurantUrl || "",
			feedback.Note || "",
			new Date().getTime()
		]);
	}

	async getAll(from?: number, to?: number): Promise<any[]> {
		let query = `
			SELECT * FROM ${TableName}
		`;

		if (from != null && to != null) {
			query += ` WHERE Timestamp BETWEEN ? and ?`
		} else if (from != null) {
			query += ` WHERE Timestamp = ?`
		}

		return this.dao.all(query, [from, to]);
	}
}
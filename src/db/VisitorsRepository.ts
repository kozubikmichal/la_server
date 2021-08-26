import IVisitorsRepository from "./IVisitorsRepository";
import { Inject } from "typescript-ioc";
import IDAO from "./IDAO";

const TableName = "visits";

export default class VisitorsRepository extends IVisitorsRepository {
	constructor(
		@Inject private dao: IDAO
	) { super(); }

	async createTable(): Promise<any> {
		return this.dao.run(`
			CREATE TABLE IF NOT EXISTS ${TableName} (
				datetime INTEGER PRIMARY KEY,
				count INTEGER
			);
		`);
	}

	async hit(datetime: number): Promise<any> {
		let affected = await this.dao.run(`
			UPDATE ${TableName} SET count = count + 1 WHERE datetime = ?
		`, [datetime]);

		if (affected === 0) {
			return this.dao.run(`
				INSERT INTO ${TableName} (datetime, count) VALUES (?, ?)
			`, [datetime, 1])
		}
	}

	async getVisitors(from?: number, to?: number): Promise<any[]> {
		let query = `
			SELECT * FROM ${TableName}
		`;

		if (from != null && to != null) {
			query += ` WHERE datetime BETWEEN ? and ?`
		} else if (from != null) {
			query += ` WHERE datetime = ?`
		}

		return this.dao.all(query, [from, to]);
	}
}
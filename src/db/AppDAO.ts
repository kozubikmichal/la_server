import { Database } from "sqlite3";
import IDAO from "./IDAO";

export default class AppDAO extends IDAO {
	db: Database

	constructor(dbFilePath: string) {
		super();
		this.db = new Database(dbFilePath, (err) => {
			if (err) {
				console.error(`Could not connect to database '${dbFilePath}'`, err);
			}
		})
	}

	run(sql: string, params: any[] = []): Promise<number> {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, function (err) {
				if (err) {
					console.error(`Error running sql '${sql}'`);
					console.error(err);
					reject(err);
				} else {
					resolve(this.changes);
				}
			})
		})
	}

	get(sql: string, params: any[] = []): Promise<any> {
		return this.getData("get", sql, params);
	}

	all(sql: string, params: any[] = []): Promise<any[]> {
		return this.getData("all", sql, params);
	}

	private getData(method: ("all" | "get"), sql: string, params: any[] = []): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db[method](sql, params, function (err, result) {
				if (err) {
					console.error(`Error running sql '${sql}'`);
					console.error(err);
					reject(err);
				} else {
					resolve(result);
				}
			})
		})
	}
}
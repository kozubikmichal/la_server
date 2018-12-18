export default abstract class IVisitorsRepository {
	abstract async createTable(): Promise<void>;
	abstract async hit(datetime: number): Promise<void>;
	abstract async getVisitors(from?: number, to?: number): Promise<any[]>;
}
export default abstract class IVisitorsRepository {
	abstract createTable(): Promise<void>;
	abstract hit(datetime: number): Promise<void>;
	abstract getVisitors(from?: number, to?: number): Promise<any[]>;
}
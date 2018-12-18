export default abstract class IDAO {
	abstract run(sql: string, params?: any[]): Promise<number>;

	abstract get(sql: string, params?: any[]): Promise<any>;

	abstract all(sql: string, params?: any[]): Promise<any[]>;
}
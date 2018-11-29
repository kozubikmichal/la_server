import { IPDFInfo } from "../IMenu"

/**
 * Restaurant provider
 */
export default abstract class IPDFInfoProvider {
	abstract getDayInfo(day: number): Promise<IPDFInfo>
}

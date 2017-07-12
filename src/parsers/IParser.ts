import { IMenuSection } from "../IMenu";
import * as jsdom from "jsdom";

interface IParser {
	parseDay(dom: jsdom.JSDOM, day: number): Promise<IMenuSection[]>
}

export default IParser;
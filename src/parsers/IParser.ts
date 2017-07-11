import { IMenuSection } from "../IMenu";
import * as jsdom from "jsdom";

interface IParser {
	parseDay(dom: jsdom.JSDOM, day: number): IMenuSection[]
}

export default IParser;
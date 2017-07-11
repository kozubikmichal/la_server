import IParser from "./parsers/IParser";

interface ISource {
	name: string;
	url: string;
	menuUrl: string;
	parser: IParser
}

export default ISource;
import { Container } from "typescript-ioc"

import IoCConfig from "./IoCConfig";
import Server from "./Server";

IoCConfig.configure();

let port = Number(process.env.PORT) || 3333;

console.log("start");

let server = Container.get(Server)
server.start(port);
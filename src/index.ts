import { Container } from "typescript-ioc"

import IoCConfig from "./IoCConfig";
import Server from "./Server";

IoCConfig.configure();

let port = Number(process.env.PORT) || 8080;

console.log(`starting at port ${port}`);

let server = Container.get(Server)
server.start(port);
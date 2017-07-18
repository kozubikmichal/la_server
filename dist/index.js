"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const IoCConfig_1 = require("./IoCConfig");
const Server_1 = require("./Server");
IoCConfig_1.default.configure();
let port = Number(process.env.PORT) || 3333;
console.log("start");
let server = typescript_ioc_1.Container.get(Server_1.default);
server.start(port);
//# sourceMappingURL=index.js.map
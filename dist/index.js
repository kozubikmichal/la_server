"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_ioc_1 = require("typescript-ioc");
var IoCConfig_1 = require("./IoCConfig");
var Server_1 = require("./Server");
IoCConfig_1.default.configure();
var port = Number(process.env.PORT) || 3333;
console.log("start");
var server = typescript_ioc_1.Container.get(Server_1.default);
server.start(port);
//# sourceMappingURL=index.js.map
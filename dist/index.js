"use strict";
exports.__esModule = true;
var typescript_ioc_1 = require("typescript-ioc");
var IoCConfig_1 = require("./IoCConfig");
var Server_1 = require("./Server");
IoCConfig_1["default"].configure();
var port = Number(process.env.PORT) || 8080;
console.log("starting at port " + port);
var server = typescript_ioc_1.Container.get(Server_1["default"]);
server.start(port);
//# sourceMappingURL=index.js.map
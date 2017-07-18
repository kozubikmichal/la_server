"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
var port = Number(process.env.PORT) || 3333;
console.log("start");
var server = new Server_1.default();
server.start(port);
//# sourceMappingURL=index.js.map
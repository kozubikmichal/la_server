import Server from "./Server";

import Request from "./Request";

let port = Number(process.env.PORT) || 3333;

console.log("start");


let server = new Server();
server.start(port);
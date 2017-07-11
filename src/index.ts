import Server from "./Server";

import Request from "./Request";

let port = 3002;

console.log("start");


let server = new Server();
server.start(port);
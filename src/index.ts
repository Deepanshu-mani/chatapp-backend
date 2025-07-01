import http from "http";
import { setupWebSocket } from "./websocketServer";
import { handlePingRequest } from "./handlePingRequest";

const server = http.createServer((req, res) => {
  handlePingRequest(req, res);
});

setupWebSocket(server);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
import http from "http";
import { setupWebSocket } from "./websocketServer";
import { handlePingRequest } from "./handlePingRequest";

const server = http.createServer((req, res) => {
  handlePingRequest(req, res);
});

setupWebSocket(server);

const PORT = Number(process.env.PORT) || 8080;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
import { IncomingMessage, ServerResponse } from "http";

export function handlePingRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.url === "/ping") {
    res.writeHead(200);
    res.end("pong");
  }
}
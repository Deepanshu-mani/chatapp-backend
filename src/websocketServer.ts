import { WebSocketServer, WebSocket } from "ws";

interface User {
  socket: WebSocket;
  room: string;
}

let allSocket: User[] = [];

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    socket.on("message", (message) => {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === "join") {
        allSocket.push({
          socket,
          room: parsedMessage.payload.roomId,
        });
      }

      if (parsedMessage.type === "chat") {
        let currentUserRoom: string | null = null;

        for (let i = 0; i < allSocket.length; i++) {
          if (allSocket[i].socket === socket) {
            currentUserRoom = allSocket[i].room;
            break;
          }
        }

        for (let i = 0; i < allSocket.length; i++) {
          if (allSocket[i].room === currentUserRoom) {
            allSocket[i].socket.send(parsedMessage.payload.message);
          }
        }
      }
    });

    socket.on("close", () => {
      allSocket = allSocket.filter((user) => user.socket !== socket);
    });
  });
};
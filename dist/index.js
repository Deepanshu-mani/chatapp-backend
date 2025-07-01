"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSocket = [];
wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            let currentUSerRoom = null;
            // const currentUSerRoom = allSocket.find((x) => x.socket == socket )?.room;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].socket === socket) {
                    currentUSerRoom = allSocket[i].room;
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].room == currentUSerRoom) {
                    allSocket[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});

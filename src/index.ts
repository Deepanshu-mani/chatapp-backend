import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
interface User {
    socket: WebSocket
    room: string
}
let allSocket: User[] = [];

wss.on('connection', (socket) => {

    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type === "join") {
            allSocket.push({
                socket,
                room : parsedMessage.payload.roomId
            })
        }
        if (parsedMessage.type === "chat") {
            let currentUSerRoom = null;
            // const currentUSerRoom = allSocket.find((x) => x.socket == socket )?.room;
            for (let i = 0 ; i < allSocket.length ; i++){
                if(allSocket[i].socket === socket){
                    currentUSerRoom = allSocket[i].room;
                }
            }
            for( let i = 0 ; i < allSocket.length ; i++) {
                if(allSocket[i].room == currentUSerRoom){
                    allSocket[i].socket.send(parsedMessage.payload.message)
                }
            }
        }

    })
   


})

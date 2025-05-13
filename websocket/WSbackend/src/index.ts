import { WebSocketServer, WebSocket} from "ws";

const wss = new WebSocketServer({port : 8080});

interface User {
    socket : WebSocket,
    room : string ;
}

let allSocket: User[] = []
wss.on("connection" , (socket)=>{
    socket.on("message", (message)=>{
        const parsedData = JSON.parse(message as unknown as string);
        if(parsedData.type == "join"){
            console.log("user joined room" + parsedData.payload.roomId);
            allSocket.push({
                socket,
                room : parsedData.payload.roomId
            })
        }

        if(parsedData.type == "chat"){
            console.log("user want to chat");
            let currentUserRoom = null ; 
            for(let i= 0 ; i< allSocket.length; i++){
                if(allSocket[i].socket == socket){
                    currentUserRoom = allSocket[i].room;
                }
            }

            for(let i= 0; i<allSocket.length ; i++){
                if(allSocket[i].room == currentUserRoom){
                    allSocket[i].socket.send(parsedData.payload.message)
                }
            }
        }





    })
    

})
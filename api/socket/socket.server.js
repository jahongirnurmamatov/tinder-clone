import { Server } from "socket.io";

let io;

const connectedUsers = new Map();

export const intializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return next(new Error("Invalid user ID"));
  });

  io.on("connection", (socket) => {
    console.log(`User connected socket id: ${socket.id}}`);
    connectedUsers.set(socket.userId, socket.id);

    socket.on("disconnect", () => {
      console.log(`User disconnected socket id: ${socket.id}}`);
      connectedUsers.delete(socket.userId);
    });
  });
};

export const getIO = ()=>{
    if(!io){
        throw new Error("Socket not initialized");
    }
    return io;
}

export const getConnectedUsers = ()=> connectedUsers;
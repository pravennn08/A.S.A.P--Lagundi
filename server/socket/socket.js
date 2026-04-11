import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  const isDev = process.env.NODE_ENV !== "production";

  io = new Server(server, {
    cors: {
      origin: isDev ? "http://localhost:5173" : true,
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

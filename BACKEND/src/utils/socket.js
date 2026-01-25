import { Server } from "socket.io";
import crypto from "crypto";
import { Chat } from "../models/chat.js";

const getSecretRoomId = (userId, targetUserId) => {
  if (!userId || !targetUserId) return null;
  const secret = [userId, targetUserId].sort().join("_");
  return crypto.createHash("sha256").update(secret).digest("hex");
};

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // 1. Join Logic: Backend generates the hash
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
      console.log(`User joined hashed room: ${roomId}`);
    });

    // 2. Message Logic: Backend generates hash to route the message
    socket.on("sendMessage",
      async ({ userId, targetUserId, firstName, lastName, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " + text);

          // TODO: Check if userId & targetUserId are friends

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export default initializeSocket;
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Use a ref to keep the same socket instance across renders
  const socketRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        senderId: senderId?._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    // 1. Establish connection
    socketRef.current = createSocketConnection();

    // 2. Join the room
    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });

    // 3. Listen for incoming messages
    socketRef.current.on("messageReceived", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 4. Cleanup on unmount
    return () => {
      socketRef.current.off("messageReceived");
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg">
      <h1 className="p-5 border-b border-gray-600 font-bold">Chat</h1>

      <div className="flex-1 overflow-y-auto p-5 bg-base-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.senderId === userId ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-header">
              {msg.firstName} {msg.lastName}
            </div>
            <div
              className={`chat-bubble ${
                msg.senderId === userId ? "chat-bubble-primary" : ""
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 bg-transparent rounded-full px-4 py-2 outline-none"
        />
        <button onClick={sendMessage} className="btn btn-primary rounded-full">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

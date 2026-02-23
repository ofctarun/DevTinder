import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";

const Chat = () => {
  const { targetUserId } = useParams();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const connections = useSelector((store) => store.connections.connections);
  const targetUser = connections.find((conn) => conn._id === targetUserId);

  // Use a ref to keep the same socket instance across renders
  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

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
    if (connections.length === 0) {
      fetchConnections();
    }
  }, [targetUserId]);

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
    <div className="flex flex-col lg:flex-row w-full lg:w-11/12 mx-auto gap-5 m-5 h-[80vh] lg:h-[75vh]">
      {/* Chat Container */}
      <div className="flex-1 border border-gray-600 flex flex-col rounded-xl bg-base-300 shadow-2xl overflow-hidden">
        <h1 className="p-5 border-b border-gray-600 font-bold text-xl flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={targetUser?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="avatar" />
            </div>
          </div>
          {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Chat"}
        </h1>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${msg.senderId === userId ? "chat-end" : "chat-start"
                }`}
            >
              <div className="chat-header text-xs opacity-50 mb-1">
                {msg.firstName}
              </div>
              <div
                className={`chat-bubble shadow-md ${msg.senderId === userId ? "chat-bubble-primary" : "bg-base-100"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>

        <div className="p-5 border-t border-gray-600 flex items-center gap-2 bg-base-300">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-500 bg-base-100 rounded-full px-5 py-3 outline-none focus:border-primary transition-all"
          />
          <button onClick={sendMessage} className="btn btn-primary rounded-full px-6 shadow-lg">
            Send
          </button>
        </div>
      </div>

      {/* Target User Details Sidebar */}
      {targetUser && (
        <div className="w-full lg:w-80 border border-gray-600 rounded-xl bg-base-300 shadow-2xl overflow-hidden hidden lg:flex flex-col">
          <div className="relative">
            <img
              src={targetUser.photoURL}
              alt={targetUser.firstName}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-300 p-4">
              <h2 className="text-2xl font-bold">{targetUser.firstName} {targetUser.lastName}, <span className="font-light">{targetUser.age}</span></h2>
              <p className="text-sm opacity-70 uppercase tracking-widest">{targetUser.gender}</p>
            </div>
          </div>

          <div className="p-5 space-y-6 flex-1 overflow-y-auto">
            {targetUser.bio && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-primary uppercase tracking-tighter">About</h3>
                <p className="text-sm italic text-base-content/80">"{targetUser.bio}"</p>
              </div>
            )}

            {targetUser.skills && targetUser.skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-primary uppercase tracking-tighter">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {targetUser.skills.map((skill, index) => (
                    <span key={index} className="badge badge-outline badge-sm py-3 px-3">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

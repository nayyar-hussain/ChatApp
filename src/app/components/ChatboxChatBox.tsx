"use client";
import { SendHorizontal, RefreshCw } from "lucide-react"; // Added RefreshCw for refresh button
import React, { useEffect, useState, useRef } from "react";
import Icons from "./Icons";
import { useAppContext } from "../Context/store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

// Interface for Sender/Receiver details
interface IUser {
  name: string;
  ImageUrl: string;
}

// Interface for Message
interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  sender: IUser | null;
  receiver: IUser | null;
}

// Interface for API Response
interface IApiResponseMessages {
  status: number;
  msg: string;
  messages: IMessage[];
}

const ChatboxChatBox = () => {
  const { userId, receiverId , userName} = useAppContext();
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to scroll to bottom

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages
  const handleFetchMessages = async () => {
    if (!userId || !receiverId) return;

    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get<IApiResponseMessages>(
        `/api/message?userId=${userId}`
      );
      console.log("Messages response:", data);
      // Filter messages to show only conversation with receiverId
      const filteredMessages = data.messages.filter(
        (msg) =>
          (msg.senderId === userId && msg.receiverId === receiverId) ||
          (msg.senderId === receiverId && msg.receiverId === userId)
      );
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      const err = error as AxiosError<{ msg?: string }>;
      const errorMsg =
        err.response?.data?.msg || "Failed to fetch messages. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!content.trim()) {
      toast.error("Please type a message");
      return;
    }

    try {
      const { data } = await axios.post("/api/message", {
        content,
        userId,
        receiverId,
      });
      console.log("Send message response:", data);
      setContent(""); // Clear input
      toast.success(data.msg || "Message sent successfully");
      await handleFetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
      const err = error as AxiosError<{ msg?: string }>;
      const errorMsg =
        err.response?.data?.msg || "Failed to send message. Please try again.";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if (userId && receiverId) {
      handleFetchMessages();
    }
  }, [userId, receiverId]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 bg-slate-200">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold">
          Chat with {userName || "select User"}
        </h1>
        <button
          onClick={handleFetchMessages}
          className="p-2 bg-[#298acd] text-white rounded-full hover:bg-blue-700 transition"
          title="Refresh Messages"
        >
          <Icons Icon={RefreshCw} />
        </button>
      </div>
      <div className="flex flex-col h-screen bg-gray-100 p-4">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {isLoading && <div className="text-center">Loading messages...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {messages.length === 0 && !error && !isLoading && (
            <div className="text-center">No messages found.</div>
          )}
          {/* Reverse messages to show latest at bottom */}
          {[...messages]
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) // Sort by time
            .map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === userId ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`p-3 px-5 rounded-tr-none rounded-full max-w-[70%] ${
                    message.senderId === userId
                      ? "bg-[#298acd] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{message.content}</p>
                  <small className="text-xs">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
        </div>

        {/* Message Input */}
        <div className="mt-4 flex rounded-full overflow-hidden">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <div  onClick={handleSendMessage} className="w-[80px] h-full bg-[#298acd] text-white flex justify-center items-center">
            <div className="cursor-pointer">
              <Icons Icon={SendHorizontal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatboxChatBox;
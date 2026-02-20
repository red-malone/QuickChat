import React, { useEffect, useRef, useState, useContext } from "react";
import assets from "../assets/assets";
import clsx from "clsx";
import { formatTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const { messages, getMessages, sendMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const scrollEnd = useRef();

  // Load conversation when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Filter messages for conversation
  const conversationMessages = messages.filter(
    (msg) =>
      (msg.senderId === authUser?._id && msg.receiverId === selectedUser?._id) ||
      (msg.senderId === selectedUser?._id && msg.receiverId === authUser?._id),
  );

  // Auto-scroll to the latest message when messages or selected user changes
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    await sendMessage(inputText.trim());
    setInputText("");
  };

  const isOnline = (userId) => onlineUsers?.includes(userId);

  return selectedUser ? (
    <div className="flex flex-col h-full min-h-0 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={selectedUser?.profilePic || assets.profile_martin}
            alt=""
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">
              {selectedUser?.fullName || "Name"}
            </p>
            
          </div>
        </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="flex items-left text-xs text-gray-400">
              <span className={clsx("w-3 h-3 rounded-full", isOnline(selectedUser._id) ? "bg-green-500" : "bg-red-500")}></span>
              <span className="pl-1">{isOnline(selectedUser._id) ? "Online" : "Offline"}</span>
            </span>
          <img
            onClick={() => {
              setSelectedUser(null);
            }}
            src={assets.arrow_icon}
            alt="back"
            className="md:hidden w-5 cursor-pointer hover:opacity-70 transition"
          />
          <img
            src={assets.help_icon}
            alt="help"
            className="hidden md:block w-5 cursor-pointer hover:opacity-70 transition"
          />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {conversationMessages.length > 0 ? (
            conversationMessages.map((message, index) => {
              const isCurrentUser = message.senderId === authUser?._id;
              return (
                <div
                  key={index}
                  className={clsx(
                    "flex gap-2 mb-2",
                    isCurrentUser ? "justify-end" : "justify-start",
                  )}
                >
                  {!isCurrentUser && (
                    <img
                      src={selectedUser?.profilePic}
                      alt=""
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                  )}
                  <div
                    className={clsx(
                      "flex flex-col",
                      isCurrentUser ? "items-end" : "items-start",
                      "max-w-xs",
                    )}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs text-gray-400 mb-1">
                        {selectedUser?.fullName}
                      </p>
                    )}
                    <div
                      className={clsx(
                        "px-4 py-2 rounded-xl break-words",
                        isCurrentUser
                          ? "bg-violet-600 text-white rounded-br-none"
                          : "bg-gray-700/50 text-gray-100 rounded-bl-none border border-gray-600",
                      )}
                    >
                      {message.text ? (
                        <p className="text-sm">{message.text}</p>
                      ) : message.image ? (
                        <img
                          src={message.image}
                          alt=""
                          className="max-w-xs w-full rounded object-cover"
                        />
                      ) : null}
                    </div>
                    <p className={clsx("text-xs text-gray-500 mt-1", isCurrentUser && "text-right")}>{formatTime(message.createdAt)}</p>
                  </div>
                  {isCurrentUser && <div className="w-8 flex-shrink-0" />}
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-40 text-gray-500">
              <p className="text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          )}
          <div ref={scrollEnd} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-700 p-4 bg-[#1a1a2e]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700/50 text-white rounded-full px-4 py-2 outline-none placeholder-gray-500 text-sm border border-gray-600 focus:border-violet-500 transition"
          />
          <button onClick={handleSend} className="p-2 bg-violet-600 rounded-full hover:bg-violet-700 transition">
            <img src={assets.send_button} alt="send" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <img src={assets.logo_icon} alt="logo" className="w-20 opacity-70" />
      <p className="text-lg font-medium text-gray-300">
        Select a user to start chatting
      </p>
    </div>
  );
};

export default ChatContainer;

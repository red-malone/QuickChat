import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({}); // { userId: count }

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/message/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseen || {});
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/message/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages || []);
        // reset unseen count for this user
        setUnseenMessages((prev) => ({ ...prev, [userId]: 0 }));
      }
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
      return null;
    }
  };

  const sendMessage = async (text) => {
    if (!selectedUser) return null;
    try {
      console.log("Sending message to userId:", selectedUser._id);
      const { data } = await axios.post(`/message/send/${selectedUser._id}`, { text });
      if (data.success) {
        const msg = data.newMessage || data.message;
        if (msg) setMessages((prev) => [...prev, msg]);
      }
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
      return null;
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (selectedUser && message.senderId === selectedUser._id) {
        message.seen = true;
        setMessages((prev) => [...prev, message]);
        axios.put(`/message/messages/seen/${message._id}`).catch(() => {});
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [message.senderId]: (prev[message.senderId] || 0) + 1,
        }));
      }
    };

    // Listen for both server event names just in case
    socket.on("newMessage", handleNewMessage);
    socket.on("message", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("message", handleNewMessage);
    };
  }, [socket, selectedUser, axios]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    setMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

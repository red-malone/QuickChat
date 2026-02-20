import { createContext } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { get } from "mongoose";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({}); // { userId: count }
  const { socket, axios } = useContext(AuthContext);
  //funtion to get users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/message/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };
  //function to get messages for selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/message/${userId}`);
      if (data.success) {
        setMessages(data.messages);
        //Reset unseen messages count for this user
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    }

    const sendMesssage = async (text) => {
      try {
        const { data } = await axios.post(`/message/send/${selectedUser._id}`, {
          text,
        });
        if (data.success) {
          setMessages((prev) => [...prev, data.message]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      }
    };
    const subscribeToMessages = async () => {
      if (!socket) return;

      socket.on("newMessage", (message) => {
        //If the message is from the selected user, add it to messages
        if (selectedUser && message.senderId === selectedUser._id) {
          message.seen = true; //Mark as seen since user is viewing the chat
          setMessages((prev) => [...prev, message]);
          axios.put(`/message/seen/${message._id}`); //Mark message as seen in backend
        } else {
          //Otherwise, increment unseen messages count for that user
          setUnseenMessages((prev) => ({
            ...prev,
            [message.senderId]: (prev[message.senderId] || 0) + 1,
          }));
        }
      });
    };
    const unsubscribeFromMessages = () => {
      if (socket) {
        socket.off("newMessage");
      }
    };

    useEffect(() => {
      subscribeToMessages();
      return () => {
        unsubscribeFromMessages();
      };
    }, [socket, selectedUser]);

    const value = {
      messages,
      users,
      selectedUser,
      getUsers,
      setMessages,
      sendMesssage,
      setSelectedUser,
      unseenMessages,
      setUnseenMessages,
    };

    return (
      <ChatContext.Provider value={{ value }}>{children}</ChatContext.Provider>
    );
  };
};

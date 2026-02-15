import { createContext } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { get } from "mongoose";

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({}); // { userId: count }
    const {socket,axios}=useContext(AuthContext);
    //funtion to get users for sidebar
    const getUsers=async()=>{
        try{
            const {data}=await axios.get("/message/users")
            if(data.success){
                setUsers(data.users);
            }
        }catch(error){
            console.error("Error fetching users:",error);

        }
    }




    const value={
        getUsers,
    }

  return <ChatContext.Provider value={{value}}>
        {children}
  </ChatContext.Provider>
}
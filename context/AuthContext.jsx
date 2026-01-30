
import axios from "axios";
import { createContext } from "react";

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=BACKEND_URL;
export const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [authUser,setAuthUser]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const [socket,setSocket]=useState(null);
    const checkAuth=async()=>{
        try{
            const {data}=await axios.get("/")
        }catch(error){
            console.error("Error checking authentication:", error.message);
        }
    }
    const value={
        axios,
        authUser,
        onlineUsers,
        socket
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
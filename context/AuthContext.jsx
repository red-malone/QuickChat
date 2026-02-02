
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=BACKEND_URL;
export const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/users/check-auth")
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
            toast.error("Session expired. Please log in again.");
        }
    }
    //COnnect socket function to handle socket connections 
    const connectSocket=(userData)=>{
        if(!userData||socket?.connected) return;
        const newsocket=io(BACKEND_URL,{
            query:{userId:userData._id}
        })
        newsocket.connect()
        setSocket(newsocket);
        newsocket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users);
        })
    }
    //Login function to handle user auth and socket connection 
    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/users/${state}`, credentials)
            if (data.success) {
                setAuthUser(data.userData)
                connectSocket(data.userData);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
                setToken(data.token)
                localStorage.setItem("token", data.token);
                toast.success(data.message)
                return data;
            }
            return data;
        } catch (err) {
            console.error("Login error:", err);
            toast.error(err?.response?.data?.message || err.message)
            return null;
        }
    }
    const logout=()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        delete axios.defaults.headers.common["Authorization"];
        toast.success("Logged out successfully");
        socket?.disconnect();
        setSocket(null);
    }

    //Update profile function to handle user profile updates
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/users/profile", body)
            if (data.success) {
                setAuthUser(data.updatedUser);
                toast.success(data.message)
            }
        } catch (err) {
            console.error("Profile update error:", err);
            toast.error(err?.response?.data?.message || err.message)
        }
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
        checkAuth();
    }, [token])
    const value={
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
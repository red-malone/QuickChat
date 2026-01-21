import React from "react";
import assets from "../assets/assets";
import clsx from "clsx";

const ChatContainer = ({selectedUser,setSelectedUser}) => {
  return selectedUser ? (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img src={selectedUser?.profilePic || assets.profile_martin} alt="" className="w-10 h-10 rounded-full flex-shrink-0"/>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">
              {selectedUser?.fullName || "Name"}
            </p>
            <span className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <img 
            onClick={() => {setSelectedUser(null)}} 
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
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will be rendered here */}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <img src={assets.logo_icon} alt="logo" className="w-20 opacity-70"/>
      <p className="text-lg font-medium text-gray-300">
        Select a user to start chatting
      </p>
    </div>
  );
};

export default ChatContainer;

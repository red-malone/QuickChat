import React, { useState } from "react";
import RightSidebar from "../components/RightSidebar";
import ChatContainer from "../components/ChatContainer";
import SideBar from "../components/SideBar";
const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);
  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`grid grid-cols-1 relative backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflown-hidden h-[100%] ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}
      >
        <SideBar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;

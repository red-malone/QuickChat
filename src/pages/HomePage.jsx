import React, { useState } from "react";
import RightSidebar from "../components/RightSidebar";
import ChatContainer from "../components/ChatContainer";
import SideBar from "../components/SideBar";
import clsx from "clsx";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);
  return (
    <div className="w-full h-screen px-4 py-4 sm:px-[5%] sm:py-[2%] lg:px-[10%] lg:py-[3%]">
      <div
        className={clsx(
          'grid relative backdrop-blur-xl border border-gray-700 rounded-3xl h-full overflow-hidden',
          selectedUser ? "grid-cols-1 md:grid-cols-[280px_1fr_320px]" : "grid-cols-1 md:grid-cols-[280px_1fr]"
        )}
      >
        <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  );
};

export default HomePage;

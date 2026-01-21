import React from 'react'
import clsx from 'clsx'

const RightSidebar = ({ selectedUser }) => {
  return (
    <div className={clsx(
      'hidden lg:flex flex-col bg-[#8185B2]/10 h-full border-l border-gray-700 p-4 overflow-y-auto',
      !selectedUser && 'lg:hidden'
    )}>
      {selectedUser ? (
        <div className="space-y-6">
          {/* User Info Header */}
          <div className="text-center pb-4 border-b border-gray-700">
            <img 
              src={selectedUser?.profilePic} 
              alt="" 
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <h3 className="text-white font-medium text-lg">{selectedUser?.fullName}</h3>
            <p className="text-gray-400 text-sm">Active now</p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-gray-300 text-xs font-semibold uppercase tracking-wide">Quick Actions</h4>
            <button className="w-full px-4 py-2 rounded-lg bg-violet-600/20 text-violet-300 text-sm hover:bg-violet-600/30 transition">
              Call
            </button>
            <button className="w-full px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 text-sm hover:bg-blue-600/30 transition">
              Video Call
            </button>
          </div>

          {/* User Details */}
          <div className="space-y-3">
            <h4 className="text-gray-300 text-xs font-semibold uppercase tracking-wide">Details</h4>
            <div className="text-sm text-gray-400 space-y-2">
              <p><span className="text-gray-500">Member since:</span> 2024</p>
              <p><span className="text-gray-500">Status:</span> Online</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p className="text-sm">Select a user to view details</p>
        </div>
      )}
    </div>
  )
}

export default RightSidebar
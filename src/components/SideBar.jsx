import React from 'react'
import assets ,{userDummyData}from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const SideBar = ({selectedUser,setSelectedUser}) => {
  const navigate=useNavigate();
  return (
    <div className={clsx('bg-[#8185B2]/10 h-full flex flex-col border-r border-gray-700', selectedUser && 'max-md:hidden')}>
        {/* Header Section */}
        <div className='p-4 border-b border-gray-700'>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt="logo" className='w-32' />
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer' />
                    <div className={clsx('absolute top-full right-0 z-20 w-40 mt-1 p-4 rounded-lg bg-[#282142] border border-gray-700 text-gray-100 hidden group-hover:block shadow-lg')}>
                      <p className='cursor-pointer text-sm hover:text-white transition' onClick={()=>navigate('/profile')}>Edit Profile</p>
                      <hr className='my-2 border-t border-gray-600'/>
                      <p className='cursor-pointer text-sm hover:text-white transition'>Logout</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Search Section */}
        <div className='p-4 border-b border-gray-700'>
          <div className='bg-[#282142] rounded-full flex items-center gap-3 py-3 px-4 border border-gray-700'>
            <img src={assets.search_icon} alt="Search" className='w-4 flex-shrink-0' />
            <input 
              type="text" 
              className='bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 flex-1 w-full' 
              placeholder='Search User'
            />
          </div>
        </div>

        {/* Users List Section */}
        <div className='flex-1 overflow-y-auto px-2 py-2'>
            {userDummyData.map((user,index)=>{
                return(
                    <div 
                      onClick={()=>{setSelectedUser(user)}} 
                      key={index} 
                      className={clsx(
                        'flex items-center gap-3 p-3 mx-2 rounded-lg cursor-pointer transition duration-200 hover:bg-[#282142]/30',
                        selectedUser?.id === user._id && 'bg-[#282142]/60 border border-violet-600/30'
                      )}
                    >
                        <img src={user?.profilePic || assets.avatar_icon} alt='' className='w-10 h-10 rounded-full flex-shrink-0' />
                        <div className='flex flex-col flex-1 min-w-0'>
                            <p className='text-sm font-medium text-white truncate'>
                                {user.fullName}
                            </p>
                            {
                                index<3
                                  ? <span className='text-green-400 text-xs'>Online</span>
                                  : <span className='text-red-400 text-xs'>Offline</span>
                            }
                        </div>
                        {
                            index>2 && <p className='text-xs w-5 h-5 flex-shrink-0 flex justify-center items-center rounded-full bg-violet-600 font-semibold'>
                                {index}
                            </p>
                        }
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default SideBar
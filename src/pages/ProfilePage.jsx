import React, { useState } from 'react'
import assets from '../assets/assets'
import clsx from 'clsx'

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(assets.avatar_icon)
  const [fullName, setFullName] = useState("John Doe")
  const [email, setEmail] = useState("john@example.com")
  const [bio, setBio] = useState("Hi Everyone, I am Using QuickChat")
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePic(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    // persist data here if needed
    setSaveSuccess(true)
    setIsEditing(false)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className='min-h-screen bg-cover backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4'>
      <div className={clsx(
        'w-full max-w-xs border rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden',
        isEditing 
          ? 'border-violet-500/50 bg-white/8 p-5 sm:p-6' 
          : 'border-gray-600/50 bg-white/5 p-4 sm:p-5'
      )}>
        {/* Header */}
        <div className='flex flex-col items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600'>
            <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
            </svg>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent'>
            Profile
          </h1>
        </div>

        {saveSuccess && (
          <div className='mt-3 p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium text-center animate-pulse'>
            ✓ Updated!
          </div>
        )}

        {/* Profile Picture */}
        <div className='mt-4 flex flex-col items-center gap-2'>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-80 transition duration-300 pointer-events-none'></div>
            <img 
              src={profilePic} 
              alt="profile" 
              className='relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-slate-900'
            />
            {isEditing && (
              <label className='absolute bottom-0 right-0 bg-gradient-to-br from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 p-2 rounded-full cursor-pointer transition shadow-lg'>
                <input 
                  type='file' 
                  accept='image/*' 
                  onChange={handleImageUpload}
                  className='hidden'
                />
                <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 13a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </label>
            )}
          </div>
          {isEditing && (
            <p className='text-xs text-gray-400 text-center px-3'>Click camera to update</p>
          )}
        </div>

        {/* Controls: move Edit button outside the form to avoid any accidental submit */}
        

        {/* Form */}
        <form onSubmit={handleSave} className='mt-4 flex flex-col gap-3'>
          <div>
            <label className='text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1.5'>Name</label>
            <input 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              type='text' 
              className={clsx(
                'w-full px-3 py-2 rounded-lg border text-sm transition-all duration-200',
                'text-white placeholder-gray-500 focus:outline-none',
                isEditing 
                  ? 'bg-white/10 border-violet-500/50 focus:border-violet-400 focus:bg-white/15 cursor-text' 
                  : 'bg-white/5 border-gray-600/50 cursor-default opacity-70'
              )}
              placeholder='Full Name'
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className='text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1.5'>Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type='email' 
              className={clsx(
                'w-full px-3 py-2 rounded-lg border text-sm transition-all duration-200',
                'text-white placeholder-gray-500 focus:outline-none',
                isEditing 
                  ? 'bg-white/10 border-violet-500/50 focus:border-violet-400 focus:bg-white/15 cursor-text' 
                  : 'bg-white/5 border-gray-600/50 cursor-default opacity-70'
              )}
              placeholder='Email'
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className='text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1.5'>Bio</label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)}
              rows={isEditing ? 2 : 1}
              className={clsx(
                'w-full px-3 py-2 rounded-lg border text-sm transition-all duration-200',
                'text-white placeholder-gray-500 resize-none focus:outline-none',
                isEditing 
                  ? 'bg-white/10 border-violet-500/50 focus:border-violet-400 focus:bg-white/15 cursor-text' 
                  : 'bg-white/5 border-gray-600/50 cursor-default opacity-70'
              )}
              placeholder='Tell us about yourself'
              readOnly={!isEditing}
            />
          </div>

          <div className='flex gap-2 mt-1'>
            {isEditing ? (
              <>
                <button 
                  type='submit' 
                  className='flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold text-sm transition shadow-lg'
                >
                  Save
                </button>
                <button 
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='px-3 py-2 rounded-lg border border-gray-600/50 hover:border-gray-500 text-gray-300 hover:text-white font-semibold text-sm transition'
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className='w-full text-center text-xs text-gray-400'>Toggle edit to change profile</div>
            )}
          </div>
        </form>
        <div className='mt-3 flex justify-end'>
          <button
            type='button'                 // IMPORTANT: must be type="button"
            onClick={() => setIsEditing(prev => !prev)}
            className='px-3 py-1 rounded-md text-sm border border-gray-600/40 hover:bg-white/5 transition'
          >
            {isEditing ? 'Editing' : 'Edit'}
          </button>
        </div>
        {!isEditing && (
          <div className='mt-4 pt-3 border-t border-gray-600/30 space-y-2'>
            <div className='flex justify-between text-xs'>
              <span className='text-gray-400'>Member</span>
              <span className='text-gray-200 font-medium'>Jan 2025</span>
            </div>
            <div className='flex justify-between text-xs'>
              <span className='text-gray-400'>Status</span>
              <span className='text-emerald-400 font-medium flex items-center gap-1'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                Active
              </span>
            </div>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default ProfilePage

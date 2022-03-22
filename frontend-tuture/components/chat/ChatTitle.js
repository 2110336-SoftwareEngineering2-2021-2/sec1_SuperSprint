import React from 'react'

export default function ChatTitle({
    name,
    profileImg
}) {
  return (
    <div>
        <nav className="w-full h-20 bg-base-200 rounded-lg flex justify-between items-center">
            <div className="flex justify-center items-center ml-3"> 
                <div class="avatar w-fit h-fit online">
                    <div class="w-14 rounded-full">
                        <img src={profileImg} alt="Profile Image"/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg text-base-content text ml-3 font-bold">{name}</span>
                    <span className="text-sm text-base-content ml-3">Active Now</span>
                </div>
            </div>

        </nav>
    </div>
  )
}

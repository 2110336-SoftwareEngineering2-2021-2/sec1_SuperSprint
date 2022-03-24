import React from 'react'

export default function OtherMessage({
    name,
    messages,
    profileImg
}) {

  return (
    <div className="flex w-full space-x-5">
        <div class="avatar w-fit h-fit">
            <div class="w-24 rounded-full">
                <img src={profileImg} alt="Profile Image"/>
            </div>
        </div>
        <div className="flex-col items-start">
            <div className="">
                <span className="block">{name}</span>
            </div>
            <div className="flex flex-col gap-y-3">
            {
                messages.map((message) => {
                    return (
                        <div class="relative max-w-xl px-4 py-2 text-base-content bg-base-200 rounded-box shadow float-left flex ml-3 w-max">
                            <span className="block">{message}</span>
                        </div>
                    )
                }
                )
            }
            </div>
        </div>

    </div>
  )
}

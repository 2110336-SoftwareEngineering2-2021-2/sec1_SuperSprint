import React from 'react';

export default function OtherMessage({ name, messages, profileImg }) {
  return (
    <div className="flex w-full space-x-5">
      <div className="avatar h-fit w-fit">
        <div className="w-16 rounded-full">
          <img src={profileImg} alt="Profile Image" />
        </div>
      </div>
      <div className="flex-col items-start">
        <div className="">
          <span className="block">{name}</span>
        </div>
        <div className="flex flex-col gap-y-3">
          {messages.map((message) => {
            return (
              <div className="rounded-box relative float-left ml-3 flex w-max max-w-xl bg-base-200 px-4 py-2 text-base-content shadow">
                <span className="block">{message}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

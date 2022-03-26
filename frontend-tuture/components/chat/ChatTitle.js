import React from 'react';

export default function ChatTitle({ name, profileImg }) {
  return (
    <div>
      <div className="flex h-20 w-full items-center justify-between rounded-b-lg bg-base-200">
        <div className="ml-3 flex items-center justify-center">
          <div class="avatar online h-fit w-fit">
            <div class="w-14 rounded-full">
              <img src={profileImg} alt="Profile Image" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text ml-3 text-lg font-bold text-base-content">
              {name}
            </span>
            <span className="ml-3 text-sm text-base-content">Active Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function SelfMessage({ messages }) {
  return (
    <div className="flex w-full flex-col items-end justify-end justify-items-end">
      {messages.map((message, index) => {
        return (
          <div key={index} className="flex space-x-3 space-y-3">
            <div className="flex flex-col justify-end">
              <span className="inline-block text-xs">
                Read {message.readTime}
              </span>
            </div>
            <div className="flex flex-col gap-y-3">
              <div class="rounded-box relative float-right mr-3 flex max-w-xl bg-primary px-4 py-2 text-base-content shadow">
                {message.sendImage ? (
                  <img src={message.msg} className="rounded-box" />
                ) : (
                  <span class="block">{message.msg}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

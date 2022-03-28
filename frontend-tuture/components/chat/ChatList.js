import SimpleBarReact from 'simplebar-react';
import ChatCard from './ChatCard';
import { useState, useEffect } from 'react';

function ChatList({
  chats,
  setChatId,
  canAccept = true,
  currentChatId,
  onAccept,
  onDecline,
}) {
  return (
    <div className="overflow-x-clip shadow-xl">
      <div className="h-[6%] pt-6 pb-2 shadow-lg shadow-secondary/20 sm:h-[8%]">
        <h1 className="w-24 px-4 text-xl font-bold xs:w-56 sm:text-2xl md:w-80">
          Chats
        </h1>
      </div>
      <SimpleBarReact
        autoHide
        className="h-[94%] w-24 xs:w-56 sm:h-[92%] md:w-80"
      >
        {chats.map((chat) => (
          <ChatCard
            key={chat.chatId}
            {...chat}
            canAccept={canAccept}
            onClick={() => setChatId(chat.chatId)}
            onAccept={() => onAccept(chat.chatId)}
            onDecline={() => onDecline(chat.chatId)}
            selected={currentChatId === chat.chatId}
          />
        ))}
      </SimpleBarReact>
    </div>
  );
}

export default ChatList;

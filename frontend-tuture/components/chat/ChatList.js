import SimpleBarReact from 'simplebar-react';
import ChatCard from './ChatCard';

function ChatList({ chats, setChatId, currentChatId, onAccept, onDecline }) {
  return (
    <div className="overflow-x-clip shadow-xl">
      <div className="sm:h-[6%] h-[5%] pb-2 shadow-lg shadow-secondary/20">
        <h1 className="px-4 sm:text-2xl text-xl font-bold md:w-80 xs:w-56 w-24">Chats</h1>
      </div>
      <SimpleBarReact autoHide className="sm:h-[94%] h-[95%] md:w-80 xs:w-56 w-24">
        {chats.map((chat) => (
          <ChatCard
            key={chat.chatId}
            {...chat}
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

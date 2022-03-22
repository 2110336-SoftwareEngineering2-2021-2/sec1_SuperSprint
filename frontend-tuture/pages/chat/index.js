import React from 'react';
import ChatFeed from '../../components/chat/ChatFeed';
import ChatList from '../../components/chat/ChatList';
import Layout from '../../components/Layout';

export default function Chat() {
  return (
    <Layout title="Chat Page">
      <div className="flex h-screen flex-row divide-x-4 pb-3 pl-3 pr-3">
        <div className="flex-2 p-5">
          <ChatList />
        </div>
        <div className="flex-1">
          <ChatFeed />
        </div>
      </div>
    </Layout>
  );
}

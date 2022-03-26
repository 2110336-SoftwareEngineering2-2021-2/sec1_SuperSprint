import React, { useState } from 'react';
import ChatFeed from '../../components/chat/ChatFeed';
import ChatList from '../../components/chat/ChatList';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

export default function Chat({ chats, subjectList }) {
  const { data: session } = useSession();
  const router = useRouter();
  const currentChatId = router.query.chatId || '';

  function onAccept(chatId) {
    console.log('Accept', chatId);
  }

  function onDecline(chatId) {
    console.log('Decline', chatId);
  }

  return (
    // <Layout title="Chat Page">
    //   <div className="flex h-screen flex-row divide-x-4 pb-3 pl-3 pr-3">
    //     <div className="flex-2 p-5">
    //       <ChatList chats={chats} setChatId={setChatId} onAccept={onAccept} onDecline={onDecline} currentChatId={chatId}/>
    //     </div>
    //     <div className="flex-1">
    //       <ChatFeed />
    //     </div>
    //   </div>
    // </Layout>
    <Layout>
      <div className=" -my-8 flex h-[calc(100%+2rem)] w-full">
        <div className="flex w-fit overflow-auto">
          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            setChatId={(chatId) =>
              router.replace(`/chat?chatId=${chatId}`, null, { shallow: true })
            }
            canAccept={session.user.role === 'tutor'}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        </div>
        {currentChatId !== '' && (
          <div className="flex flex-1 overflow-auto">
            <ChatFeed subjectList={subjectList} chatId={chatId} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // const chatTest = Array.from({ length: 16 }, () => {
  //   return {
  //     firstName: (Math.random() + 1)
  //       .toString(36)
  //       .substring(Math.floor(Math.random() * 6 + 2)),
  //     lastName: (Math.random() + 1)
  //       .toString(36)
  //       .substring(Math.floor(Math.random() * 6 + 2)),
  //     chatId: Math.random(),
  //     accepted: Math.random() > 0.5,
  //   };
  // });

  var subjectList;
  try {
    const subjectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/getAllSubjectsLevel`,
      {
        timeout: 2000,
      }
    );
    if (!subjectsRes.ok) {
      throw new Error('Fetch error');
    }
    const subjectsData = await subjectsRes.json();

    subjectList = subjectsData;
  } catch (error) {
    console.log(error);
    subjectList = {
      Mathemetic: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
      Physic: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
      Biology: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
      English: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
    };
  }

  // Test jaaaa
  // tutorId=621c818daefa29db6f3e806f
  // studentId=621c8c3d363377298c2bf8b2

  const chat = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat?tutorId=621c818daefa29db6f3e806f&studentId=621c8c3d363377298c2bf8b2`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Fetch error');
  }

  const chatData = await res.json();

  // Get student list

  const tutorChatList = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/getChatsStudent?studentId=621c8c3d363377298c2bf8b2`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Fetch error');
  }

  const studentList = await res.json();

  // Get tutor list

  const studentChatList = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/getChatsTutor?tutorId=621c818daefa29db6f3e806f`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Fetch error');
  }

  const tutorList = await res.json();

  
  return {
    props: { session, subjectList, chats: chatData },
  };
}

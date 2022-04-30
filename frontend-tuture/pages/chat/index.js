import React, { useState, useEffect } from 'react';
import ChatFeed from '../../components/chat/ChatFeed';
import ChatList from '../../components/chat/ChatList';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';

function getChatterInfo(chats, chatId) {
  const chat = chats.find((chat) => chat.chatId === chatId);
  // console.log('hey', chat);
  return {
    firstName: chat.firstName,
    lastName: chat.lastName,
    profileImg: chat.profileImg,
  };
}

export default function Chat({ chatData, subjectList }) {
  const { data: session } = useSession();
  const router = useRouter();
  const currentChatId = router.query.chatId || '';
  const [chats, setChats] = useState(chatData);
  const [chatFeed, setChatFeed] = useState(
    currentChatId === '' ? {} : getChatterInfo(chatData, currentChatId)
  );

  async function onAccept(chatId) {
    if (session.user.role === 'tutor') {
      const res = await fetch(
        `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/chat/tutorAcceptChat/${chatId}`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            contentType: 'application/json',
          },
          body: JSON.stringify({
            chatId: chatId,
          }),
        }
      );
      if (!res.ok) {
        throw new Error('Fetch error');
      }
      const chats = await getChats(session);
      setChats(chats);
      return;
    }
    // console.log('Accept', chatId);
  }

  async function onDecline(chatId) {
    const res = await fetch(
      `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/chat/declineChat/${chatId}`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          contentType: 'application/json',
        },
        body: JSON.stringify({
          chatId: chatId,
        }),
      }
    );
    if (!res.ok) {
      const test = await res.json();
      console.error(test);
      throw new Error('Fetch error');
    }
    const chats = await getChats(session);
    setChats(chats);
    // console.log('Decline', chatId);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const chats = await getChats(session);
      setChats(chats);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout title="Chat | Tuture">
      <div className=" -my-8 flex h-[calc(100%+2rem)] w-full">
        <div className="flex w-fit overflow-auto">
          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            setChatId={(chatId) => {
              router.replace(`/chat?chatId=${chatId}`, null, { shallow: true });
              setChatFeed(getChatterInfo(chats, chatId));
            }}
            canAccept={session.user.role === 'tutor'}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        </div>
        {currentChatId !== '' && (
          <div className="flex flex-1 overflow-auto">
            <ChatFeed
              subjectList={subjectList}
              chatId={currentChatId}
              chatFeed={chatFeed}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

async function getChats(session) {
  var route = 'getChatsStudent';
  if (session.user.role === 'student') route = 'getChatsStudent?studentId=';
  else if (session.user.role === 'tutor') route = 'getChatsTutor?tutorId=';

  const res = await fetch(
    `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/chat/${route}${session.user._id}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Fetch error');
  }

  const data = await res.json();
  if (session.user.role === 'student') {
    const formatted = data.map((e) => {
      return {
        chatId: e._id,
        studentId: e.studentId._id,
        tutorId: e.tutorId._id,
        firstName: e.tutorId.firstName,
        lastName: e.tutorId.lastName,
        profileImg: e.tutorId.profileUrl,
        accepted: e.accepted,
      };
    });
    return formatted;
  } else if (session.user.role === 'tutor') {
    const formatted = data.map((e) => {
      return {
        chatId: e._id,
        studentId: e.studentId._id,
        tutorId: e.tutorId._id,
        firstName: e.studentId.firstName,
        lastName: e.studentId.lastName,
        profileImg: e.studentId.profileUrl,
        accepted: e.accepted,
      };
    });
    return formatted;
  }
  // console.log(session.user._id, 'chat', data);
  return data;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const chatTest = Array.from({ length: 16 }, () => {
    return {
      firstName: (Math.random() + 1)
        .toString(36)
        .substring(Math.floor(Math.random() * 6 + 2)),
      lastName: (Math.random() + 1)
        .toString(36)
        .substring(Math.floor(Math.random() * 6 + 2)),
      chatId: Math.random(),
      accepted: Math.random() > 0.5,
    };
  });

  var subjectList;
  try {
    const subjectsRes = await fetch(
      `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/subject/getAllSubjectsLevel`,
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

  const chatData = await getChats(session);

  return {
    props: { session, subjectList, chatData },
  };
}

import React, { useEffect, useRef, useState } from 'react';
import ChatTitle from './ChatTitle';
import MessageForm from './MessageForm';
import OtherMessage from './OtherMessage';
import SelfMessage from './SelfMessage';
import { useSession } from 'next-auth/react';
import ChatAppointmentCard from './ChatAppointmentCard';

const selfData = {
  name: 'Batman',
  messages: [
    {
      msg: 'ถ้าช่วงนี้น่าจะเป็นตอนเย็นๆประมาณ 4-5 โมงเลยครับ',
      readTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      sendImage: false,
    },
    {
      msg: 'คุณสะดวกไหมครับ',
      readTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      sendImage: false,
    },
    {
      msg: 'ถ้าไม่สะดวกก็ไม่ต้องเรียนครับ',
      readTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      sendImage: false,
    },
    {
      msg: 'https://img-comment-fun.9cache.com/media/aG1B1L7/am0KarLV_700w_0.jpg',
      readTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      sendImage: true,
    },
  ],
  profileImg:
    'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg',
};

async function getAppointments(session, chatId) {
  try {
    const res = await fetch(
      `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/appointment/chat/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    const data = await res.json();

    return data.appointments.map((appt) => {
      if (session.user.role === 'tutor') {
        const temp = { ...appt };
        temp.userData = temp.studentId;
        temp.firstName = temp.userData.firstName;
        temp.lastName = temp.userData.lastName;
        temp.studentId = temp.studentId._id;
        temp.subjects = [];
        temp.levels = [];
        temp.subjects.push(temp.subjectId.title);
        temp.levels.push(temp.subjectId.level);
        temp.subjects = [...new Set(temp.subjects)];
        temp.levels = [...new Set(temp.levels)];
        return {
          apptId: temp._id,
          chatId: chatId,
          firstName: temp.firstName,
          lastName: temp.lastName,
          subjects: temp.subjects,
          levels: temp.levels,
          studentId: temp.studentId,
          tutorId: temp.tutorId,
          startApptDate: temp.startTime,
          endApptDate: temp.endTime,
          status: temp.status,
          profileImg: temp.userData.profileUrl,
          createdDate: temp.updated_at,
          price: temp.price,
        };
      } else if (session.user.role === 'student') {
        const temp = { ...appt };
        temp.userData = temp.tutorId;
        temp.firstName = temp.userData.firstName;
        temp.lastName = temp.userData.lastName;
        temp.tutorId = temp.tutorId._id;
        temp.subjects = [];
        temp.levels = [];
        temp.subjects.push(temp.subjectId.title);
        temp.levels.push(temp.subjectId.level);
        temp.subjects = [...new Set(temp.subjects)];
        temp.levels = [...new Set(temp.levels)];
        return {
          apptId: temp._id,
          chatId: chatId,
          firstName: temp.firstName,
          lastName: temp.lastName,
          subjects: temp.subjects,
          levels: temp.levels,
          studentId: temp.studentId,
          tutorId: temp.tutorId,
          startApptDate: temp.startTime,
          endApptDate: temp.endTime,
          status: temp.status,
          profileImg: temp.userData.profileUrl,
          createdDate: temp.updated_at,
          price: temp.price,
        };
      }
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function ChatFeed({ subjectList, chatId, chatFeed }) {
  const { data: session } = useSession();
  
  const passedChatId = useRef()
  passedChatId.current = chatId
  // const [loading, setLoading] = useState(false);

  let nameFeed =
    chatFeed.length === 0
      ? 'Batman'
      : `${chatFeed.firstName} ${chatFeed.lastName}`;
  let profileFeed =
    chatFeed.length === 0
      ? 'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg'
      : chatFeed.profileImg;

  const titleData = {
    name: nameFeed,
    profileImg: profileFeed,
  };

  const otherData1 = {
    name: nameFeed,
    messages: ['โย่วว', 'พอดีผมสนใจเรียนครับ', 'สะดวกสอนช่วงไหนบ้างครับ'],
    profileImg: profileFeed,
  };

  const otherData2 = {
    name: nameFeed,
    messages: ['มุแง๊', 'อย่าใจร้ายขรับ เรียนก็ได้', 'จัดมาดิ้ เอาแบบเบิ้มๆ'],
    profileImg: profileFeed,
  };

  const [appts, setAppts] = useState([]);

  async function reloadAppts(fetchChatId) {
    const newAppts = (await getAppointments(session, fetchChatId)).filter(appt => passedChatId.current === appt.chatId);
    // console.log(newAppts);
    setAppts(newAppts);
  }

  useEffect(() => {
    const interval = setInterval(async () => await reloadAppts(passedChatId.current), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(async () => {
    await reloadAppts(passedChatId.current);
  }, [chatId]);

  async function onAccept(apptId) {
    // setLoading(true);
    const result = await fetch(
      `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/appointment/student/accept/${apptId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    await reloadAppts(passedChatId.current);
    // setLoading(false);
  }

  async function onDecline(apptId) {
    // setLoading(true);
    const result = await fetch(
      `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/appointment/${apptId}`,
      {
        method: 'DELETE',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    await reloadAppts(passedChatId.current);
    // setLoading(false);
  }

  return (
    <div className="relative h-screen flex-grow flex-col items-center justify-end space-y-5 pb-2 align-middle">
      <div className="sticky top-0 z-10 shadow-xl">
        <ChatTitle {...titleData} />
      </div>
      <div className="sticky flex flex-row items-center justify-center">
        <div className="badge badge-primary h-full w-screen max-w-screen-xs">
          Today
        </div>
      </div>
      <div className="mb-10 overflow-hidden overscroll-auto">
        <OtherMessage {...otherData1} />
        <SelfMessage {...selfData} />
        <OtherMessage {...otherData2} />
        {appts.map((appt) => (
          <ChatAppointmentCard
            key={appt.apptId}
            {...appt}
            canAccept={session.user.role === 'student'}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        ))}
      </div>
      <div className="sticky bottom-0 mx-auto h-max w-full bg-base-200">
        <MessageForm subjectList={subjectList} chatId={chatId} />
      </div>
    </div>
  );
}

import React from 'react';
import ChatTitle from './ChatTitle';
import MessageForm from './MessageForm';
import OtherMessage from './OtherMessage';
import SelfMessage from './SelfMessage';
import { useSession } from 'next-auth/react';
import ChatAppointmentCard from './ChatAppointmentCard';

const otherData1 = {
  name: 'Batman',
  messages: ['โย่วว', 'พอดีผมสนใจเรียนครับ', 'สะดวกสอนช่วงไหนบ้างครับ'],
  profileImg:
    'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg',
};

const otherData2 = {
  name: 'Batman',
  messages: ['มุแง๊', 'อย่าใจร้ายขรับ เรียนก็ได้', 'จัดมาดิ้ เอาแบบเบิ้มๆ'],
  profileImg:
    'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg',
};

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

export default function ChatFeed({ subjectList, chatId }) {
  const { data: session } = useSession();

  const titleData = {
    name: 'Batman',
    profileImg:
      'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg',
  };

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
        <ChatAppointmentCard canAccept={session.user.role === 'student'} />
      </div>
      <div className="sticky bottom-0 mx-auto h-max w-full bg-base-200">
        <MessageForm subjectList={subjectList} chatId={chatId} />
      </div>
    </div>
  );
}

import React from 'react';
import ChatTitle from './ChatTitle';
import MessageForm from './MessageForm';
import OtherMessage from './OtherMessage';
import SelfMessage from './SelfMessage';

export default function ChatFeed() {
  const otherData1 = {
    name: 'Batman',
    messages: ['Hi bro', 'พอดีผมสนใจเรียนครับ', 'สะดวกสอนช่วงไหนบ้างครับ'],
    profileImg:
      'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg',
  };

  const otherData2 = {
    name: 'Batman',
    messages: ['ผมสะดวกพอดีครับ', 'ผมขอจองเวลานี้เลยนะครับ'],
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

  const titleData = {
    name: 'Batman',
    profileImg:
      'https://www.koimoi.com/wp-content/new-galleries/2021/05/robert-pattinson-wants-the-batman-to-have-his-multiple-love-interests-001.jpg',
  };

  return (
    <div className="flex-col items-center space-y-5 pb-2 pl-3 pr-3 align-middle justify-end relative">
      <ChatTitle {...titleData} />
      <div className="flex flex-row items-center justify-center">
        <div className="badge badge-primary h-full w-screen max-w-screen-xs">
          Today
        </div>
      </div>
      <OtherMessage {...otherData1} />
      <SelfMessage {...selfData} />
      <OtherMessage {...otherData2} />
      <footer>
        <div className="flex fixed bottom-0 justify-center items-start bg-base-100 w-full h-max align-middle justify-items-center">
          <MessageForm />
        </div>
      </footer>
      
    </div>
  );
}

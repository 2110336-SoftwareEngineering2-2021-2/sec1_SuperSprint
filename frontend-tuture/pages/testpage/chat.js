// import { getSession } from 'next-auth/react';
// import { useState } from 'react';
// import ChatList from '../../components/chat/ChatList';
// import Layout from '../../components/Layout';

// function Chat({ chats }) {
//   const [chatId, setChatId] = useState('');

//   function onAccept(chatId) {
//     console.log('Accept', chatId);
//   }

//   function onDecline(chatId) {
//     console.log('Decline', chatId);
//   }

//   return (
//     <Layout>
//       <div className="flex h-full">
//         <ChatList
//           chats={chats}
//           currentChatId={chatId}
//           setChatId={setChatId}
//           onAccept={onAccept}
//           onDecline={onDecline}
//         />
//         <div className="m-2">{chatId}</div>
//       </div>
//     </Layout>
//   );
// }

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   const chatTest = Array.from({ length: 16 }, () => {
//     return {
//       firstName: (Math.random() + 1)
//         .toString(36)
//         .substring(Math.floor(Math.random() * 6 + 2)),
//       lastName: (Math.random() + 1)
//         .toString(36)
//         .substring(Math.floor(Math.random() * 6 + 2)),
//       chatId: Math.random(),
//       accepted: Math.random() > 0.5,
//     };
//   });

//   return {
//     props: { session, chats: chatTest },
//   };
// }

// export default Chat;

import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../components/appointment/AppointmentCard';
import Layout from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { useSession, getSession } from 'next-auth/react';

const APPO_STATUS = {
  offering: {
    title: 'offering',
  },
  confirmed: {
    title: 'confirmed',
  },
};

const names = [
  ['Adam', 'Benson'],
  ['Clare', 'Donaldsdfadsfdsfson'],
  ['Phusaratis', 'Jong'],
  ['Donald', 'Clarkson'],
];

export default function StudentAppointment({ appts }) {
  // destringify date item
  if (appts) {
    appts = appts.map((e) => {
      const temp = { ...e };
      temp.createdDate = new Date(temp.createdDate);
      temp.apptDate = new Date(temp.apptDate);
      return temp;
    });
  }

  const { data: session } = useSession();
  const [selectedStatus, setSelectedStatus] = useState('offering');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // const [modalOnAccept, setModalOnAccept] = useState(() => {});
  const [isAccepting, setIsAccepting] = useState(false);
  const [apptId, setApptId] = useState('');

  function changeTab(event) {
    const selected = event.target.getAttribute('tabStatus');
    setSelectedStatus(selected);
  }

  function goToChat(apptId) {
    console.log(`Chat: Chat button clicked`);
    //go to chat room
  }

  function onAccept(apptId) {
    console.log(`Accept: Accept button clicked`);
    setApptId(apptId);
    setIsAccepting(true);
    if (session.user.role === 'tutor') {
      console.log("Tutor can't access this button");
      return;
    }
    //pop up modal
    setModalMessage('Are you sure you want to accept the appointment?');
    // setModalOnAccept(() => acceptAppointment(apptId));
    openModal();
  }

  function onDecline(apptId) {
    console.log(`Decline: Decline button clicked`);
    setApptId(apptId);
    setIsAccepting(false);
    if (session.user.role === 'tutor') {
      console.log("Tutor can't access this button");
      return;
    }
    //pop up modal
    setModalMessage('Are you sure you want to decline the appointment?');
    // setModalOnAccept(() => cancelAppointment(apptId));
    openModal();
  }

  function onCancel(apptId) {
    console.log('Cancel: Cancel button clicked');
    setApptId(apptId);
    setIsAccepting(false);
    setModalMessage('Are you sure you want to Cancel the appointment?');
    // setModalOnAccept(() => cancelAppointment(apptId));
    openModal();
  }

  function onModalConfirm(apptId) {
    if (!isAccepting) cancelAppointment(apptId);
    else acceptAppointment(apptId);
  }

  function acceptAppointment(apptId) {
    //accept appointment
    //.....HERE
    console.log('Student accepts appointment');
    closeModal();
    return;
  }

  function cancelAppointment(apptId) {
    //cancel appointment
    //.....HERE
    console.log('Whoever cancels appointment');
    closeModal();
    return;
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  let temp = [];
  for (let i = 0; i < 4; i++) {
    temp.push();
  }

  return (
    <Layout>
      <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
        {session.user.firstName}'s Appointment
      </h1>
      <br />

      <div className="mx-2 sm:mx-20">
        <div className="my-1 flex flex-wrap justify-center gap-4">
          <div className="tabs flex w-full flex-row justify-center">
            <a
              onClick={changeTab}
              className={`tab tab-bordered tab-lg w-1/4 ${
                selectedStatus === 'offering' ? 'tab-active' : ''
              }`}
              tabStatus="offering"
            >
              Offering
            </a>
            <a
              onClick={changeTab}
              className={`tab tab-bordered tab-lg w-1/4 ${
                selectedStatus === 'confirmed' ? 'tab-active' : ''
              }`}
              tabStatus="confirmed"
            >
              Confirmed
            </a>
          </div>
        </div>
        <div className="my-2 flex flex-wrap justify-center gap-4">
          {appts
            .filter((appt) => appt.status === selectedStatus)
            .map((appt) => (
              <AppointmentCard
                key={appt.id}
                {...appt}
                onCardClick={() => console.log(`Card click`)}
                onChooseClick={() => console.log(`Choose button click`)}
                onAccept={() => onAccept(appt.id)}
                onDecline={() => onDecline(appt.id)}
                onCancel={() => onCancel(appt.id)}
                onChatClick={() => goToChat(appt.id)}
                POV={session.user.role}
              />
            ))}
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        title="Confirmation"
        onClose={closeModal}
        // onSubmit={() => modalOnAccept(appt.id)}
        onSubmit={() => onModalConfirm(apptId)}
        // onSubmit={() => closeModal()}
        onCancel={closeModal}
        submitBtnText="yes"
        cancelBtnText="no"
      >
        <p className="text-sm text-base-content">{modalMessage}</p>
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const mock = Array.from({ length: 10 }, (_) => {
    return {
      id: Math.random(),
      status: Math.random() > 0.5 ? 'offering' : 'confirmed',
      firstName: names[Math.floor(Math.random() * names.length)][0],
      lastName: names[Math.floor(Math.random() * names.length)][1],
      profileImg:
        'https://www.chicagotribune.com/resizer/a-16fPYl-SK8W6HPnzjOHK1rqho=/800x551/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IEYVMAFZ7BBXHM46GFNLWRN3ZA.jpg',
      subjects: ['Physics', 'Chemistry'],
      levels: ['High school', 'Middle school'],
      createdDate: new Date(
        Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000
      ).toJSON(),
      apptDate: new Date(
        Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000
      ).toJSON(),
    };
  });

  return {
    props: { session, appts: mock },
  };
}

// {createdDate && (
//     <p className="w-28 text-right text-xs text-base-content/50">
//       {moment(createdDate).fromNow()}
//     </p>
//   )}

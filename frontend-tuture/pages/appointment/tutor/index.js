import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../../components/appointment/AppointmentCard';
import Layout from '../../../components/Layout';
import { Modal } from '../../../components/Modal';

const APPO_STATUS = [
  {
    title: 'Pending',
    key: 'pending',
  },
  {
    title: 'Negotiating',
    key: 'negotiating',
  },
  {
    title: 'Offering',
    key: 'offering',
  },
  {
    title: 'Confirmed',
    key: 'confirmed',
  },
];

const names = [
  ['Adam', 'Benson'],
  ['Clare', 'Donaldsdfadsfdsfson'],
  ['Phusaratis', 'Jong'],
  ['Donald', 'Clarkson'],
];

export default function TutorAppointment() {
  const [selectedStatus, setSelectedStatus] = useState(APPO_STATUS[2]);
  const [modalOpen, setModalOpen] = useState(false);

  function changeTab(event) {
    const selected = event.target.getAttribute('tabStatus');
    setSelectedStatus(APPO_STATUS.find((item) => item.key === selected));
  }

  function goToChat() {
    //add function detail
  }

  function acceptStudent() {
    //add function detail
  }

  function declineStudent() {
    //add function detail
  }

  function cancelAppointment() {
    //add function detail
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  let temp = [];
  for (let i = 0; i < 4; i++) {
    temp.push(
      <AppointmentCard
        key={i}
        firstName={names[i][0]}
        lastName={names[i][1]}
        profileImg={
          'https://www.chicagotribune.com/resizer/a-16fPYl-SK8W6HPnzjOHK1rqho=/800x551/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IEYVMAFZ7BBXHM46GFNLWRN3ZA.jpg'
        }
        subjects={['Physics', 'Chemistry']}
        levels={['High school', 'Middle school']}
        createdDate={
          new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000)
        }
        apptDate={
          new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000)
        }
        status={selectedStatus.key}
        onCardClick={() => console.log(`Card click ${names[i][0]}`)}
        onChooseClick={() => console.log(`Choose button click ${names[i][0]}`)}
        onAccept={() => console.log(`Choose button click ${names[i][0]}`)}
        onDecline={() => console.log(`Choose button click ${names[i][0]}`)}
        onCancel={() => {
          console.log(`Cancel: Choose button click ${names[i][0]}`);
          openModal();
        }}
        onChatClick={() => {
          console.log(`Chat: Choose button click ${names[i][0]}`);
          //go to chat roomm page.
        }}
        POV="tutor"
      />
    );
  }

  return (
    <Layout>
      <div>
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Tutor's Appointment Status
        </h1>
        <br />
        <div className="mx-2 sm:mx-20">
          <div className="my-1 flex flex-wrap justify-center gap-4">
            <div className="tabs flex w-full flex-row justify-center">
              <a
                onClick={changeTab}
                className={`tab tab-bordered tab-lg w-1/4 ${
                  selectedStatus.key === 'offering' ? 'tab-active' : ''
                }`}
                tabStatus="offering"
              >
                Offering
              </a>
              <a
                onClick={changeTab}
                className={`tab tab-bordered tab-lg w-1/4 ${
                  selectedStatus.key === 'confirmed' ? 'tab-active' : ''
                }`}
                tabStatus="confirmed"
              >
                Confirmed
              </a>
            </div>
          </div>
          <div className="my-2 flex flex-wrap justify-center gap-4">{temp}</div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        title="Confirmation"
        onClose={closeModal}
        onSubmit={() => {
          closeModal();
          // handleSubmit(submitScore)();
        }}
        onCancel={closeModal}
        submitBtnText="yes"
        cancelBtnText="no"
      >
        <p className="text-sm text-base-content">
          Are you sure you want to cancel the appointment?
        </p>
      </Modal>
    </Layout>
  );
}

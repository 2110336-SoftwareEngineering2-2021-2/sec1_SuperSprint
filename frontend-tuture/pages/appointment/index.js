import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../components/appointment/AppointmentCard';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

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

export default function StudentAppointment({ fetchedAppts }) {
  const [appts, setAppts] = useState(fetchedAppts || []);
  const { data: session } = useSession();
  const [selectedStatus, setSelectedStatus] = useState('offering');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isAccepting, setIsAccepting] = useState(false);
  const [apptId, setApptId] = useState('');

  const router = useRouter();

  function changeTab(event) {
    const selected = event.target.getAttribute('tabstatus');
    setSelectedStatus(selected);
  }

  async function onChatClick(studentId, tutorId) {
    toast.promise(
      async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/chat?tutorId=${tutorId}&studentId=${studentId}`
          );
          if (!res.ok) {
            const test = await res.json();
            console.log(test);
            throw new Error('Fetch Error');
          }
          const data = await res.json();
          console.log(data);
          //go to chat room
          router.push(`/chat?chatId=${data._id}`);
        } catch (error) {
          console.error(error);
        }
      },
      {
        pending: 'Redirecting to chat...',
        success: 'Redirect to chat...',
        error: 'Error! Please try again later.',
      }
    );
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

  async function acceptAppointment(apptId) {
    //accept appointment
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointment/student/accept/${apptId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    console.log('Student accepts appointment');
    await reloadAppts();
    closeModal();
    // router.push('/chat');
  }

  async function reloadAppts() {
    const newAppts = await getAppointments(session);
    setAppts(newAppts);
  }

  async function cancelAppointment(apptId) {
    //cancel appointment
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointment/${apptId}`,
      {
        method: 'DELETE',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    await reloadAppts();
    closeModal();
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
    <Layout title="Appointment | Tuture">
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
              tabstatus="offering"
            >
              Offering
            </a>
            <a
              onClick={changeTab}
              className={`tab tab-bordered tab-lg w-1/4 ${
                selectedStatus === 'confirmed' ? 'tab-active' : ''
              }`}
              tabstatus="confirmed"
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
                key={appt.apptId}
                {...appt}
                onCardClick={() => console.log(`Card click`)}
                onChooseClick={() => console.log(`Choose button click`)}
                onAccept={() => onAccept(appt.apptId)}
                onDecline={() => onDecline(appt.apptId)}
                onCancel={() => onCancel(appt.apptId)}
                onChatClick={() => onChatClick(appt.studentId, appt.tutorId)}
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

async function getAppointments(session) {
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/appointment/${session.user.role}/${session.user._id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    if (!res.ok) {
      const test = await res.json();
      console.log(test);
      throw new Error('Fetch error');
    }
    const data = await res.json();

    return data.appointments.map((appt) => {
      if (session.user.role === 'tutor') {
        const temp = { ...appt };
        console.log(temp);
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
        };
      } else if (session.user.role === 'student') {
        const temp = { ...appt };
        console.log(temp);
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
        };
      }
    });
  } catch (error) {
    console.log(error.stack);
    return [];
  }
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

  const appts = await getAppointments(session);

  // console.log('hello', appts);

  return {
    props: { session, fetchedAppts: appts },
  };
}

import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import Modal from '../../../components/Modal';
import Score from '../../../lib/api/admin/Score';
import moment from 'moment';

const mockScore = {
  tutor: {
    tutorId: 'asbadfasdfg',
    firstName: 'firstName',
    lastName: 'lastname',
    profileImg: 'https://api.lorem.space/image/face',
  },
  score: {
    subject: 'PAT1',
    level: 'PAT',
    score: 100,
    maxScore: 100,
    scoreImage: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
};

const mockScores = Array.from({ length: 10 }, (e) => mockScore);

const TableGhost = () =>
  Array.from({ length: 10 }, (e, idx) => (
    <tr key={idx} className="animate-pulse">
      <th>{idx + 1}</th>
      <td>
        <div className="flex flex-row items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-base-300"></div>
          <div className="flex flex-row items-center gap-1">
            <div className="h-4 w-28 rounded bg-base-300"></div>
            <div className="h-4 w-28 rounded bg-base-300"></div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-row gap-2">
          <div className="h-4 w-28 rounded bg-base-300"></div>
          <div className="h-4 w-16 rounded bg-base-300"></div>
        </div>
      </td>
      <td>
        <div className="h-4 w-20 rounded bg-base-300"></div>
      </td>
      <td>
        <div className="h-4 w-20 rounded bg-base-300"></div>
      </td>
      <td>
        <div className="h-4 w-16 rounded bg-base-300"></div>
      </td>
      <td>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-16 rounded bg-base-300"></div>
          <div className="h-4 w-16 rounded bg-base-300"></div>
        </div>
      </td>
    </tr>
  ));

export default function ValidateScore() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    message: '',
    function: () => true,
  });

  async function getAllPendingScore() {
    setLoading(true);
    try {
      // console.log(session.accessToken);
      const scores = await Score.getAllPendingScore(session);
      console.log('test', scores);
      setScores(scores.score);
    } catch (error) {}
    setLoading(false);
  }

  useEffect(() => {
    getAllPendingScore();
  }, []);

  async function approveScore(tutorId, subjectId, adminId) {
    // console.log('approve pls', tutorId, subjectId, adminId);
    setModalState({
      message: 'Are you sure you want to approve this score?',
      function: async () => {
        try {
          await toast.promise(
            async () => {
              await Score.approveScore(session, tutorId, subjectId, adminId);
              await getAllPendingScore();
            },
            {
              pending: 'Approving score...',
              success: 'The score is approved.',
              error: 'Error! Please try again later.',
            }
          );
        } catch (error) {
          console.error(error.message);
        }
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  }

  async function rejectScore(tutorId, subjectId, adminId) {
    // console.log('approve pls', tutorId, subjectId, adminId);
    setModalState({
      message: 'Are you sure you want to reject this score?',
      function: async () => {
        try {
          await toast.promise(
            async () => {
              await Score.rejectScore(session, tutorId, subjectId, adminId);
              await getAllPendingScore();
            },
            {
              pending: 'Rejecting score...',
              success: 'The score is rejected.',
              error: 'Error! Please try again later.',
            }
          );
        } catch (error) {
          console.error(error.message);
        }
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  }

  return (
    <Layout title="Score | Tuture Admin">
      <div className="container relative m-auto mb-4 flex flex-col items-center">
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Tutor Name</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Max Score</th>
                <th>Score Certificate</th>
                <th>Requested Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                scores.map((score, idx) => (
                  <tr key={score._id} className="hover">
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={score.tutorId.profileUrl}
                              alt="Tutor Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <Link href={`/tutor/${score.tutorId._id}`}>
                            <a className="font-bold">
                              {score.tutorId.firstName} {score.tutorId.lastName}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {score.subjectId.title}
                        <span className="badge badge-sm badge-ghost">
                          {score.subjectId.level}
                        </span>
                      </div>
                    </td>
                    <td>{score.currentScore}</td>
                    <td>{score.maxScore}</td>
                    <td>
                      <a
                        href={score.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-xs w-16"
                      >
                        Open
                      </a>
                    </td>
                    <td>
                      {moment(score.updated_at).format(
                        'DD MMMM YYYY @ hh:mm a'
                      )}
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() =>
                            approveScore(
                              score.tutorId._id,
                              score.subjectId._id,
                              session.user._id
                            )
                          }
                          className="btn btn-success btn-xs w-16"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            rejectScore(
                              score.tutorId._id,
                              score.subjectId._id,
                              session.user._id
                            )
                          }
                          className="btn btn-error btn-xs w-16"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <TableGhost />
              )}
            </tbody>
          </table>
        </div>
        {!loading && scores.length === 0 && (
          <p className="absolute top-20 m-auto w-full text-center">No result</p>
        )}
      </div>
      <Modal
        isOpen={modalOpen}
        title="Confirmation"
        onClose={() => setModalOpen(false)}
        // onSubmit={() => modalOnAccept(appt.id)}
        onSubmit={modalState.function}
        // onSubmit={() => closeModal()}
        onCancel={() => setModalOpen(false)}
        submitBtnText="confirm"
        cancelBtnText="cancel"
      >
        <p className="text-sm text-base-content">{modalState.message}</p>
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

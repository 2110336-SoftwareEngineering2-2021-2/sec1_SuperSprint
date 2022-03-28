import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import ScoreEditCard from '../../../components/tutor-score/ScoreEditCard';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getSession, useSession } from 'next-auth/react';
import { Modal } from '../../../components/Modal';

function EditScore({ scores }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setFocus,
    watch,
    trigger,
    getFieldState,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: formatFormDefaultValue(scores),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const { data: session } = useSession();

  async function submitScore(data) {
    console.log(data);
    setLoading(false);
    for (const [key, value] of Object.entries(data)) {
      if (getFieldState(key).isDirty) {
        const formData = new FormData();
        formData.append(`tutorId`, session.user._id);
        formData.append(`subjectId`, key);
        formData.append(`score`, value.currentScore);
        formData.append(`year`, value.year);
        formData.append(`scoreImage`, value.scoreImage.file || '');
        console.log(key, formData);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/score/edit`,
            {
              method: 'PATCH',
              mode: 'cors',
              credentials: 'same-origin',
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
              body: formData,
            }
          );
          if (!res.ok) throw new Error('Fetch Error');
        } catch (error) {
          console.error(error.stack);
        }
      }
    }
    setLoading(false);
    router.push('/profile/tutor');
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  console.log(errors);

  return (
    <Layout title="Edit Score | Tuture">
      <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
        Edit Score Record
      </h1>
      <div className="container mx-auto my-4">
        <form
          className="form-control mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-md py-4 px-8 shadow-md"
          id="scoreEditForm"
          onSubmit={handleSubmit(submitScore)}
        >
          {scores.map((score, idx) => (
            <ScoreEditCard
              key={score.subjectId}
              scoreData={score}
              hookFormRegister={register}
              hookFormControl={control}
              hookFormError={errors}
              onDeleteClick={() => console.log(score.subject)}
            />
          ))}

          <div className="divider"></div>

          <div className="mx-auto flex w-fit flex-col justify-center gap-1">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(evt) => {
                evt.preventDefault();
                openModal();
              }}
            >
              {!loading ? (
                'Save changes'
              ) : (
                <FontAwesomeIcon fixedWidth icon={faSpinner} spin />
              )}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={(evt) => {
                evt.preventDefault();
                reset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalOpen}
        title="Confirmation"
        onClose={closeModal}
        onSubmit={() => {
          closeModal();
          handleSubmit(submitScore)();
        }}
        onCancel={closeModal}
      >
        <p className="text-sm text-base-content">
          Do you want to save your change(s)?
        </p>
      </Modal>
    </Layout>
  );
}

async function getTutorScores(session) {
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/tutor/score?id=${session.user._id}`,
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

    return data;
  } catch (error) {
    console.log(error.stack);
    return {};
  }
}

function formatFormDefaultValue(scores) {
  const obj = {};
  scores.forEach((score) => {
    obj[score.subjectId] = {
      currentScore: score.currentScore || 0,
      year: score.year || '2022',
      scoreImage: {
        preview: score.scoreImage,
        name: '',
        file: '',
      },
    };
  });
  return obj;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const tutorScores = await getTutorScores(session);
  console.log('test', tutorScores);

  return {
    props: {
      session,
      scores: tutorScores,
    },
  };
}

export default EditScore;

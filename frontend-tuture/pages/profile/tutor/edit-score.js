import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import ScoreEditCard from '../../../components/tutor-score/ScoreEditCard';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getSession } from 'next-auth/react';
import { Modal } from '../../../components/Modal';

function EditScore({ scores }) {
  function formatFormDefaultValue(scores) {
    const obj = {};
    scores.forEach((score) => {
      obj[score.subjectId] = {
        score: score.score,
        year: score.year,
        scoreImage: {
          preview: score.scoreImage,
          name: '',
          file: '',
        },
      };
    });
    return obj;
  }

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

  async function submitScore(data) {
    console.log(data);
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if(getFieldState(key).isDirty) console.log(key, value);
    }
    try {
      setLoading(false);
      router.push('/profile/tutor')
    } catch (error) {}
    setLoading(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const scoresTest = Array.from({ length: 7 }, (_, idx) => {
    return {
      subject: 'PAT' + (idx + 1),
      level: 'PAT',
      subjectId: idx,
      year: '2022',
      score: 250,
      maxScore: 300,
      scoreImage: {
        preview:
          Math.random() > 0.5
            ? 'https://api.lorem.space/image/shoes?w=320&h=320'
            : '',
        name: '',
        file: '',
      },
    };
  });

  return {
    props: {
      session,
      scores: scoresTest,
    },
  };
}

export default EditScore;

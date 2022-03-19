import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import ScoreEditCard from '../../../components/tutor-score/ScoreEditCard';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const scoresTest = Array.from({ length: 7 }, (_, idx) => {
  return {
    subject: 'PAT' + (idx + 1),
    level: 'PAT',
    subjectId: idx,
    year: '2022',
    score: 300,
    maxScore: 300,
    scoreImage: {
      preview: 'https://api.lorem.space/image/shoes?w=320&h=320',
      name: '',
      file: '',
    },
  };
});

function EditScore(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setFocus,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      0: {
        scoreImage: {
          preview: 'https://api.lorem.space/image/shoes?w=320&h=320',
          name: '',
          file: '',
        },
      },
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  async function submitScore(data) {
    console.log(data);
    const formData = new FormData();
    try {
    } catch (error) {}
    setLoading(false);
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
          {scoresTest.map((score) => (
            <ScoreEditCard
              key={score.subjectId}
              scoreData={score}
              hookFormRegister={register}
              hookFormControl={control}
            />
          ))}

          <div className="items-centers mx-auto my-4 flex justify-center">
            <button className="btn btn-primary btn-sm rounded-full">
              {!loading ? (
                'Save changes'
              ) : (
                <FontAwesomeIcon fixedWidth icon={faSpinner} spin />
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditScore;

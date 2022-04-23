import TutorProfile from '../../components/profile/TutorProfile';
import React from 'react';
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react';
import whatGender from '../../lib/whatGender';
import TutorScorePanel from '../../components/profile/TutorScorePanel';
import Tutor from '../../lib/api/Tutor';

const scoresTest = Array.from({ length: 7 }, (_, idx) => {
  return {
    subject: 'PAT' + (idx + 1),
    level: 'PAT',
    subjectId: idx,
    year: '2022',
    score: 300,
    maxScore: 300,
    scoreImage: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  };
});

export default function tutorOther({ tutorProfile, scores }) {
  return (
    <Layout title={`${tutorProfile.firstName}'s Profile | Tuture`}>
      <div className="mx-0 mb-4 flex min-h-full flex-col lg:mx-8 lg:flex-row">
        <section className="flex-[8]">
          <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
            {`${tutorProfile.firstName}'s Profile`}
          </h1>
          <div className="px-2 sm:px-5">
            <TutorProfile {...tutorProfile} />
          </div>
        </section>

        <div className="divider divider-vertical lg:divider-horizontal"></div>

        <section className="flex-[3]">
          <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
            {`${tutorProfile.firstName}'s Score`}
          </h1>
          <div className="my-4 px-2 sm:px-5">
            <TutorScorePanel scores={scores} />
          </div>
        </section>
      </div>
    </Layout>
  );
}

async function getTutorProfile(tutorId, session) {
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/tutor/getById?id=${tutorId}`,
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

    return {
      id: data._id,
      username: data.username,
      e_mail: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: whatGender(data.gender),
      // birthDate: data.birthDate, //!
      phoneNumber: data.phone,
      preferredSubjects: data.teachSubject,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      rating: data.avgRating,
      imgUrl: data.profileUrl,
      successMatch: data.successMatch,
      dutyTime: data.dutyTime,
    };
  } catch (error) {
    console.log(error.stack);
    return {
      username: 'johndoe',
      e_mail: 'johndoe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'fegirl',
      // birthDate: '1 Jan 1000',
      phoneNumber: '0123456789',
      preferredSubjects: ['CEM III', 'Algorithm II', 'Physics VII'],
      priceMin: 0,
      priceMax: 10000,
      rating: 6.0,
      imgUrl: 'https://api.lorem.space/image/face?hash=3174',
      successMatch: 13598,
      dutyTime: ['-'],
    };
  }
}

async function getTutorScores(tutorId, session) {
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/tutor/score?id=${tutorId}`,
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

    return data.map((e) => {
      return { subjectId: e._id, ...e };
    });
  } catch (error) {
    console.log(error.stack);
    return [];
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { query } = context;

  const {success, ...tutorProfile} = await Tutor.getTutorProfile(session, query.tutorId);
  if(!success) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const tutorScores = (await Tutor.getTutorScores(session, query.tutorId)).map(
    (e) => {
      console.log(e);
      return { subjectId: e._id, ...e };
    }
  );

  return {
    props: {
      session,
      tutorProfile,
      scores: tutorScores,
    },
  };
}

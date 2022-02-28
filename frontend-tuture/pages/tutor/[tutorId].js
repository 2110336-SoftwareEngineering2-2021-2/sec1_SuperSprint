import TutorProfile from '../../components/profile/TutorProfile';

import React from 'react';
import Layout from '../../components/Layout';
import TutorImage from '../../public/images/President-Putin.png';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

function whatGender(smile) {
  if (smile === 'f') {
    return 'female';
  } else if (smile === 'm') {
    return 'male';
  } else {
    return 'Unspecified';
  }
}

export default function tutorOther({ data }) {
  const subjects = ['CEM III', 'Algorithm II', 'Physics VII'];

  // const router = useRouter();

  // const { tutorId } = router.query;

  // console.log(tutorId);

  return (
    <div>
      <Layout>
        <div className="text-b flex justify-center text-3xl">
          <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
            Tutor's Profile
          </h1>
        </div>
        <div className="items-center justify-center px-20">
          <TutorProfile
            tutorName={data.tutorName}
            gender={data.gender}
            birthDate={data.birthDate}
            phoneNumber={data.phoneNumber}
            preferredSubjects={data.preferredSubjects}
            priceMin={data.priceMin}
            priceMax={data.priceMax}
            rating={data.rating}
            imgUrl={data.imgUrl}
            successMatch={data.successMatch}
          />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { query } = context;

  try {
    const res = await fetch(
      `http://${process.env.NEXT_PUBLIC_API_URL}/tutor/getById?id=${query.tutorId}`,
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

    console.log(data);

    return {
      props: {
        data: {
          username: data.username,
          e_mail: data.email,
          tutorName: `${data.firstName} ${data.lastName}`,
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
        },
      },
    };
  } catch (error) {
    return {
      props: {
        data: {
          username: 'johndoe',
          e_mail: 'johndoe@gmail.com',
          tutorName: 'JohnDoe',
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
        },
      },
    };
  }
}

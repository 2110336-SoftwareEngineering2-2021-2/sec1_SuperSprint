import TutorProfile from '../../components/profile/TutorProfile';
import React from 'react';
import Layout from '../../components/Layout';
import { getSession } from 'next-auth/react';
import whatGender from '../../lib/whatGender';

export default function tutorOther(props) {
  return (
    <Layout title={`${props.data.firstName}'s Profile | Tuture`}>
      <div className="text-b flex justify-center text-3xl">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          {`${props.data.firstName}'s Profile`}
        </h1>
      </div>
      <div className="items-center justify-center md:px-20 sm:px-5 px-2">
        <TutorProfile {...props.data} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { query } = context;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutor/getById?id=${query.tutorId}`,
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

    // console.log(data);

    return {
      props: {
        data: {
          id: data._id,
          username: data.username,
          e_mail: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: whatGender(data.gender),
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
        },
      },
    };
  }
}

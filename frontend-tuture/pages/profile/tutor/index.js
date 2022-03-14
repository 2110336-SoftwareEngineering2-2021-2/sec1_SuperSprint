import TutorProfile from '../../../components/profile/TutorProfile';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/Layout';
import { getSession } from 'next-auth/react';

function whatGender(smile) {
  if (smile === 'f') {
    return 'female';
  } else if (smile === 'm') {
    return 'male';
  } else {
    return 'unspecified';
  }
}

export default function tutor(props) {
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
            {`${props.data.firstName}'s Profile`}
        </h1>
        <div className="mx-2 items-center justify-center">
          <TutorProfile {...props.data} />
        </div>
        <div className="flex w-full justify-center">
          <Link href="/profile/tutor/edit" passHref>
            <input
              type="submit"
              className="btn btn-primary"
              value="Edit Profile"
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/tutor/getById?id=${session.user._id}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    console.log(res);
    if (!res.ok) {
      throw new Error('Fetch error');
    }
    const data = await res.json();

    console.log(data);

    return {
      props: {
        data: {
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
        },
      },
    };
  } catch (error) {
    console.log(error);
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

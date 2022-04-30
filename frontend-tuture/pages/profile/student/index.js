import StudentProfile from '../../../components/profile/StudentProfile';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/Layout';
import { getSession } from 'next-auth/react';
import whatGender from '../../../lib/whatGender';

export default function student(props) {
  return (
    <Layout title={`${props.data.firstName}'s Profile | Tuture`}>
      <div className="mb-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          {`${props.data.firstName}'s Profile`}
        </h1>
        <div className="items-center justify-center md:px-20 sm:px-5 px-2">
          <StudentProfile {...props.data} />
        </div>
        <div className="flex w-full justify-center">
          <Link href="/profile/student/edit" passHref>
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
      `${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/student/getById?id=${session.user._id}`,
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
          // birthDate: data.birthDate, //!
          phoneNumber: data.phone,
          preferredSubjects: data.preferSubject,
          imgUrl: data.profileUrl,
          //imgUrl: 'https://tuture.s3.ap-southeast-1.amazonaws.com/IMG_5656.JPG'
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
          gender: 'yes',
          // birthDate: '1 Jan 1000',
          phoneNumber: '0123456789',
          preferredSubjects: ['CEM III', 'Algorithm II', 'Physics VII'],
          imgUrl: 'https://api.lorem.space/image/face?hash=3174',
        },
      },
    };
  }
}

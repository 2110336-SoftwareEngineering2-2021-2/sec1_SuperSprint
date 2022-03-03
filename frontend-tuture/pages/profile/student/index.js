import StudentProfile from '../../../components/profile/StudentProfile';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/Layout';
import TutorImage from '../../../public/images/President-Putin.png';
import { getSession } from 'next-auth/react';

// const subjects = ["CEM III","Algorithm II","Physics VII"];

function whatGender(smile) {
  if (smile === 'f') {
    return 'female';
  } else if (smile === 'm') {
    return 'male';
  } else {
    return 'Unspecified';
  }
}

export default function student(props) {
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
            {`${props.data.studentName}'s Profile`}
        </h1>
        <div className="mx-2 items-center justify-center">
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

  // console.log("user id is:");
  // console.log(session.user._id);

  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/subject/getSubjects`
      `${process.env.NEXT_PUBLIC_API_URL}/student/getById?id=${session.user._id}`,
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
          studentName: data.firstName + ' ' + data.lastName,
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
          studentName: 'studentName',
          gender: 'yes',
          // birthDate: '1 Jan 1000',
          phoneNumber: '0123456789',
          preferredSubjects: ['CEM III', 'Algorithm II', 'Physics VII'],
          imgUrl: TutorImage,
        },
      },
    };
  }
}

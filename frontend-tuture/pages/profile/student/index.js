import StudentProfile from '../../../components/profile/StudentProfile';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/Layout';
import TutorImage from '../../../public/images/President-Putin.png';

// const subjects = ["CEM III","Algorithm II","Physics VII"];

export default function student(props) {
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Student's Profile
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
  try {
    const res = await fetch(
      // `http://${process.env.API_URL}/subject/getSubjects`
      `http://${process.env.API_URL}/subject/getLe`
    );
    const data = await res.json();

    return {
      props: {
        data: {
          username: data.username,
          e_mail: data.e_mail,
          studentName: data.name,
          gender: data.gender,
          birthDate: data.birthDate,
          phoneNumber: data.phoneNumber,
          preferredSubjects: data.preferedSubject,
          imgUrl: data.imgUrl,
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
          birthDate: '1 Jan 1000',
          phoneNumber: '0123456789',
          preferredSubjects: ['CEM III', 'Algorithm II', 'Physics VII'],
          imgUrl: TutorImage,
        },
      },
    };
  }
}

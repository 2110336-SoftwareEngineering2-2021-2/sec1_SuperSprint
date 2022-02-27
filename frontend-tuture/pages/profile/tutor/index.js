import TutorProfile from '../../../components/profile/TutorProfile';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/Layout';
import TutorImage from '../../../public/images/President-Putin.png';

export default function tutor(props) {
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Tutor's Profile
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
          tutorName: data.name,
          gender: data.gender,
          birthDate: data.birthDate,
          phoneNumber: data.phoneNumber,
          preferredSubjects: data.preferedSubject,
          priceMin: data.priceMin,
          priceMax: data.priceMax,
          rating: data.rating,
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
          tutorName: 'JohnDoe',
          gender: 'fegirl',
          birthDate: '1 Jan 1000',
          phoneNumber: '0123456789',
          preferredSubjects: ['CEM III', 'Algorithm II', 'Physics VII'],
          priceMin: 0,
          priceMax: 10000,
          rating: 6.0,
          imgUrl: "https://api.lorem.space/image/face?hash=3174",
        },
      },
    };
  }
}

import StudentProfile from '../../components/profile/StudentProfile';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import TutorImage from '../../public/images/President-Putin.png';

export default function student() {

    const subjects = ["CEM III","Algorithm II","Physics VII"];
    

  return (
    <div>
        <Layout>
            <div className="justify-center flex text-3xl">
                <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">Student's Profile</h1>
            </div>
            <div className="justify-center items-center px-20">
            <StudentProfile 
                studentName="John Doe"
                gender="Male"
                birthDate="1 Jan 1000"
                phoneNumber="0123456789"
                preferredSubjects={subjects}
                imgUrl={TutorImage}
            />
            </div>
        </Layout>
        <div className="flex w-full justify-center">
            <Link href="../register" passHref>
                <input type="submit" className="btn btn-primary" value="Edit Profile" />
            </Link>
        </div>
    </div>
  )
}

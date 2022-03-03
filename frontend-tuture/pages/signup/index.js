import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Layout from '../../components/Layout';
import TutorImage from '../../public/images/sir-teaching-maths-in-the-class-2127160-2127160.svg';
import StudentImage from '../../public/images/students-studying-physics-in-classroom-2140100-2140100.svg';

function Register() {
  return (
    <Layout title="Sign Up | Tuture" signedIn={false}>
      <div className="container m-auto flex flex-col gap-4">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Sign Up
        </h1>
        <div className="m-auto flex w-full justify-center px-2">
          <div className="card glass w-96 transition-all duration-300 hover:shadow-lg shadow-sm hover:shadow-primary-focus/20">
            <figure className="px-2 pt-2">
              <div className="relative h-[225px] w-[400px]">
                <Image
                  src={StudentImage}
                  alt="car!"
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Student</h2>
              <div className="card-actions">
                <Link href="/signup/student" passHref>
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card glass w-96 transition-all duration-300 hover:shadow-lg shadow-sm hover:shadow-primary-focus/20">
            <figure className="px-2 pt-2">
              <div className="relative h-[225px] w-[400px]">
                <Image
                  src={TutorImage}
                  alt="car!"
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Tutor</h2>
              <div className="card-actions">
                <Link href="/signup/tutor" passHref>
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-sm sm:text-base">Choose Account Type</p>
      </div>
    </Layout>
  );
}

export default Register;

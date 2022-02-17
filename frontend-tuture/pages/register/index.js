import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';

function Register() {
  return (
    <Layout title="Register | Tuture" signedIn={false}>
      <div className="m-auto container flex flex-col gap-4">
        <h1 className="text-center font-bold xl:text-2xl text-xl text-primary">Sign Up</h1>
        <div className="m-auto flex justify-center w-full px-2">
          <div className="card glass w-96 transition-all hover:scale-105">
            <figure>
              <img
                src="https://api.lorem.space/image/car?w=400&h=225"
                alt="car!"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Student</h2>
              <div className="card-actions">
                <Link href="/register/student">
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div>
            </div>
          </div>
          <div class="divider-horizontal divider">OR</div>
          <div className="card glass w-96 transition-all hover:scale-105">
            <figure>
              <img
                src="https://api.lorem.space/image/car?w=400&h=225"
                alt="car!"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Tutor</h2>
              <div className="card-actions">
                <Link href="/register/tutor">
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center sm:text-base text-sm">Choose Account Type</p>
      </div>
    </Layout>
  );
}

export default Register;

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Layout from '../../components/Layout';
import TutorImage from '../../public/images/sir-teaching-maths-in-the-class-2127160-2127160.svg';
import StudentImage from '../../public/images/students-studying-physics-in-classroom-2140100-2140100.svg';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Login({ error }) {
  const [role, setRole] = useState('s ');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSignInClick() {
    console.log('onSignInClick', role, username, password);
    setLoading(true);
    signIn('credentials', {
      username: role + username,
      password: password,
      callbackUrl: '/',
    });
    setLoading(false);
  }

  return (
    <Layout title="Login | Tuture" signedIn={false}>
      <div className="container m-auto mb-4 flex flex-col items-center">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Sign In
        </h1>
        <div className="mx-auto my-3 flex w-full flex-col items-center justify-center px-2 sm:flex-row">
          <div
            className={`${
              role == 's '
                ? 'shadow-xl shadow-primary-focus/30 hover:shadow-xl hover:shadow-primary-focus/40'
                : 'shadow-sm hover:shadow-lg hover:shadow-primary-focus/20'
            } card-compact card glass rounded-box box-border h-auto w-96 border transition-all duration-500 sm:card-normal`}
            onClick={() => setRole('s ')}
          >
            <figure className="px-2 pt-2">
              <div className="relative h-32 w-[400px] md:h-[225px]">
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
              {/* <div className="card-actions">
                <Link href="/register/tutor" passHref>
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div> */}
            </div>
          </div>
          <div className="divider divider-vertical sm:divider-horizontal">
            OR
          </div>

          {/* Button here */}
          <div
            className={`${
              role == 't '
                ? 'shadow-xl shadow-primary-focus/30 hover:shadow-xl hover:shadow-primary-focus/40'
                : 'shadow-sm hover:shadow-lg hover:shadow-primary-focus/20'
            } card-compact card glass rounded-box box-border h-auto w-96 border transition-all duration-500 sm:card-normal`}
            onClick={() => setRole('t ')}
          >
            <figure className="px-2 pt-2">
              <div className="relative h-32 w-[400px] md:h-[225px]">
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
              {/* <div className="card-actions">
                <Link href="/register/tutor" passHref>
                  <button className="btn btn-primary btn-sm">Select</button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm sm:text-base">
          Choose Account Type
        </p>

        <form
          className="flex w-full flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            onSignInClick();
          }}
        >
          <div className="form-control mx-auto w-full max-w-xs">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              value={username}
              placeholder="Enter Username"
              name="username"
              autoComplete="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={password}
              placeholder="Enter Password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <SignInError error={error} />}
          {/* <br/> */}
          <button type="submit" className="btn btn-primary my-2">
            {!loading ? (
              'Sign In'
            ) : (
              <FontAwesomeIcon fixedWidth icon={faSpinner} spin />
            )}
          </button>
        </form>
        {/* </form> */}
        {/* <p className="overflow-hidden" align="center">or</p>  */}
        <div className="divider divider-vertical">OR</div>
        <Link href="/register" passHref>
          <button className="btn btn-ghost my-2">Register</button>
        </Link>
        {/* {session &&
                <button onClick={() => signOut()}>
                  Log out
                </button>
                } */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { error } = query;

  return {
    props: {
      error: error || null,
    },
  };
}

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};

const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <p className="mt-3 text-sm text-error">{errorMessage}</p>;
};

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

export default function AdminLogin({ error }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSignInClick() {
    // console.log('onSignInClick', role, username, password);
    setLoading(true);
    signIn('credentials', {
      username: 'a ' + username,
      password: password,
      // admin: true,
      callbackUrl: '/',
    });
    // setLoading(false);
  }

  return (
    <Layout title="Admin Sign In | Tuture">
      <div className="container m-auto mb-4 flex flex-col items-center">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Admin Sign In
        </h1>

        <form
          className="flex w-full flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            onSignInClick();
          }}
        >
          <div className="form-control mx-auto w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
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
            <label className="label">
              <span className="label-text">Password</span>
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
          <button type="submit" className="btn btn-primary my-2 normal-case">
            {!loading ? (
              'Sign In'
            ) : (
              <FontAwesomeIcon fixedWidth icon={faSpinner} spin />
            )}
          </button>
        </form>
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
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
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

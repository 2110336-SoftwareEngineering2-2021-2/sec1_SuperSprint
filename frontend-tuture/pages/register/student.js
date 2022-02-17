import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import Layout from '../../components/Layout';

const METER_BG_COLOR = [
  'bg-red-400',
  'bg-red-400',
  'bg-yellow-400',
  'bg-yellow-400',
  'bg-green-500',
];
const METER_TEXT_COLOR = [
  'text-red-400',
  'text-red-400',
  'text-yellow-400',
  'text-yellow-400',
  'text-green-500',
];
const PWD_STRENGTH = ['weak', 'weak', 'okay', 'good', 'strong'];

function StudentRegister() {
  const specialCharRegex = /.*[!@#\$%\^\&*\)\(+=._-].*/g;
  const uppercaseRegex = /.*[A-Z].*/g;
  const lowercaseRegex = /.*[a-z].*/g;
  const [password, setPassword] = useState({ password: '', score: 0 });

  function onPasswordChange(event) {
    const newPassword = event.target.value;
    const evaluation = zxcvbn(newPassword);
    setPassword({ password: newPassword, score: evaluation.score });
  }

  return (
    <Layout title="Register Student | Tuture" signedIn={false}>
      <div className="container m-auto">
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Create Student Account
        </h1>
        <form
          className="form-control mx-auto w-full max-w-2xl p-2"
          id="student_register_form"
          // onSubmit={submitMatching}
        >
          <label className="label" htmlFor="study_subject">
            <span className="label-text">
              Username <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <input
            className="input-bordered input-primary input w-full max-w-xs"
            id="username"
            placeholder="Enter Username"
            autoComplete="username"
            required
          />
          <label className="label" htmlFor="study_subject">
            <span className="label-text">
              Password <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <input
            type="password"
            className="input-bordered input-primary input w-full max-w-xs"
            id="new-password"
            placeholder="Enter Password"
            autoComplete="new-password"
            required
            value={password.password}
            onChange={onPasswordChange}
          />
          <div className="my-2 flex max-w-xs">
            {[...Array(5)].map((e, idx) => (
              <div key={idx} className="w-1/5 px-1">
                <div
                  className={`h-2 rounded-xl ${
                    password.score !== 0 && password.score >= idx
                      ? METER_BG_COLOR[password.score]
                      : 'bg-base-300'
                  } transition-colors`}
                ></div>
              </div>
            ))}
          </div>
          <p
            className={`max-w-xs text-right ${
              METER_TEXT_COLOR[password.score]
            } text-sm transition-colors `}
          >
            {PWD_STRENGTH[password.score]}
          </p>
          <ul className="ml-8 list-disc">
            <li
              className={`text-sm ${
                password.password.length >= 8 ? 'text-zinc-500' : 'text-error'
              }`}
            >
              Contains at least 8 characters
            </li>
            <li
              className={`text-sm ${
                uppercaseRegex.test(password.password)
                  ? 'text-zinc-500'
                  : 'text-error'
              }`}
            >
              Contains at least 1 uppercase letters
            </li>
            <li
              className={`text-sm ${
                lowercaseRegex.test(password.password)
                  ? 'text-zinc-500'
                  : 'text-error'
              }`}
            >
              Contains at least 1 lowercase letters
            </li>
            <li
              className={`text-sm ${
                specialCharRegex.test(password.password)
                  ? 'text-zinc-500'
                  : 'text-error'
              }`}
            >
              Contains at least 1 special letters
            </li>
          </ul>
          <label className="label" htmlFor="study_subject">
            <span className="label-text">
              Confirm Password{' '}
              <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <input
            type="password"
            className="input-bordered input-primary input w-full max-w-xs"
            id="new-password-confirm"
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
          />
          <div className="divider"></div>
        </form>
      </div>
    </Layout>
  );
}

export default StudentRegister;

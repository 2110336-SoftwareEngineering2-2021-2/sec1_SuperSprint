import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import {
  uppercaseRegex,
  lowercaseRegex,
  numberRegex,
  specialCharRegex,
} from '../commons/Regex';
import {
  METER_BG_COLOR,
  METER_TEXT_COLOR,
  PWD_STRENGTH,
  MIN_PWD_LENGTH,
} from './Constants';

export function PasswordField({ hookFormRegister, hookFormErrors }) {
  const [passwordState, setPasswordState] = useState({
    password: '',
    score: 0,
  });

  function onPasswordChange(newPassword) {
    const evaluation = zxcvbn(newPassword);
    setPasswordState({ password: newPassword, score: evaluation.score });
  }

  return (
    <>
      <input
        type="password"
        className="input-bordered input-primary input w-full max-w-xs"
        {...hookFormRegister('new_password', {
          onChange: (e) => onPasswordChange(e.target.value),
        })}
        id="new_password"
        placeholder="Enter Password"
        autoComplete="new-password"
      />
      {hookFormErrors.new_password && (
        <label className="label">
          <span className="label-text-alt text-error">
            {hookFormErrors.new_password.message}
          </span>
        </label>
      )}
      <div className="my-2 flex max-w-xs">
        {[...Array(5)].map((e, idx) => (
          <div key={idx} className="w-1/5 px-1">
            <div
              className={`h-2 rounded-xl ${
                passwordState.score !== 0 && passwordState.score >= idx
                  ? METER_BG_COLOR[passwordState.score]
                  : 'bg-base-300'
              } transition-colors`}
            ></div>
          </div>
        ))}
      </div>
      <p
        className={`max-w-xs text-right ${
          METER_TEXT_COLOR[passwordState.score]
        } ${
          passwordState.password.length === 0 ? 'invisible' : 'visible'
        } text-sm transition-all `}
      >
        {PWD_STRENGTH[passwordState.score]}
      </p>
      <ul className="ml-8 list-disc">
        <li
          className={`text-sm transition-colors ${
            passwordState.password.length === 0 ||
            passwordState.password.length >= MIN_PWD_LENGTH
              ? 'text-zinc-500/70'
              : 'text-error'
          }`}
        >
          Contains at least {MIN_PWD_LENGTH} characters
        </li>
        <li
          className={`text-sm transition-colors ${
            passwordState.password.length === 0 ||
            uppercaseRegex.test(passwordState.password)
              ? 'text-zinc-500/70'
              : 'text-error'
          }`}
        >
          Contains at least 1 uppercase letters
        </li>
        <li
          className={`text-sm transition-colors ${
            passwordState.password.length === 0 ||
            lowercaseRegex.test(passwordState.password)
              ? 'text-zinc-500/70'
              : 'text-error'
          }`}
        >
          Contains at least 1 lowercase letters
        </li>
        <li
          className={`text-sm transition-colors ${
            passwordState.password.length === 0 ||
            numberRegex.test(passwordState.password)
              ? 'text-zinc-500/70'
              : 'text-error'
          }`}
        >
          Contains at least 1 numerical letters
        </li>
        <li
          className={`text-sm transition-colors ${
            passwordState.password.length === 0 ||
            specialCharRegex.test(passwordState.password)
              ? 'text-zinc-500/70'
              : 'text-error'
          }`}
        >
          Contains at least 1 special letters
        </li>
      </ul>
    </>
  );
}

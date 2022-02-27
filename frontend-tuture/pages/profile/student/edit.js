import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import Layout from '../../../components/Layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from 'react-hook-form';
import {
  uppercaseRegex,
  lowercaseRegex,
  numberRegex,
  specialCharRegex,
} from '../../../components/commons/Regex';
import { studentEditSchema } from '../../../components/profile/StudentSchema';
import AvatarUpload from '../../../components/AvatarUpload';
import {
  MAX_SUBJECT,
  METER_BG_COLOR,
  METER_TEXT_COLOR,
  MIN_PWD_LENGTH,
  PWD_STRENGTH,
} from '../../../components/register-pages/Constants';
import SubjectListForm from '../../../components/register-pages/SubjectListForm';
import { getSession } from 'next-auth/react';
import fetchWithTimeout from '../../../lib/fetchWithTimeout';

function StudentProfileEdit(props) {
  const [passwordState, setPasswordState] = useState({
    password: '',
    score: 0,
  });
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: props.profileData.username,
      new_password: '',
      new_password_confirm: '',
      first_name: props.profileData.firstName,
      last_name: props.profileData.lastName,
      email: props.profileData.email,
      phone: props.profileData.phone,
      gender: props.profileData.gender,
      //avatar: {},
      subjects: props.profileData.subjects,
    },
    resolver: yupResolver(studentEditSchema),
  });

  function onPasswordChange(newPassword) {
    const evaluation = zxcvbn(newPassword);
    setPasswordState({ password: newPassword, score: evaluation.score });
  }

  async function submitRegister(data) {
    // event.preventDefault();
    console.log('pass');
    // console.log(dirtyFields);
    // console.log(data);
    // const formData = new FormData();
    // console.log(data.avatar.file);
    // formData.append('file', data.avatar.file);
    // const options = {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   // credentials: 'same-origin',
    //   headers: {
    //     Authorization: 'Client-ID bac84ec92d60897',
    //   },
    //   body: formData
    // };
    // console.log(formData);
    // console.log(options);
    // const res = await fetch('https://api.anonfiles.com/upload', options);
    // console.log(res);
    // console.log(await res.json());
  }

  // console.log(watch());
  console.log(errors);

  return (
    <Layout title="Edit Profile | Tuture" signedIn={false}>
      <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
        Edit Profile
      </h1>
      <div className="container mx-auto my-4">
        <form
          className="form-control mx-auto w-full max-w-3xl rounded-md py-4 px-8 shadow-md"
          id="student_register_form"
          onSubmit={handleSubmit(submitRegister)}
        >
          <h2 className="-mx-4 my-3 text-xl font-bold">Account</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full flex-[2] sm:w-2/3">
              <label className="label" htmlFor="username">
                <span className="label-text">
                  Username <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                className="input-bordered input-primary input w-full max-w-xs"
                {...register('username')}
                id="username"
                type="text"
                placeholder="Enter Username"
                name="username"
                disabled
                // autoComplete="username"
                required
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.username.message}
                  </span>
                </label>
              )}
              <label className="label" htmlFor="new_password">
                <span className="label-text">
                  New Password{' '}
                  <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-bordered input-primary input w-full max-w-xs"
                {...register('new_password', {
                  onChange: (e) => onPasswordChange(e.target.value),
                })}
                id="new_password"
                placeholder="Enter Password"
                autoComplete="new-password"
              />
              {errors.new_password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.new_password.message}
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
              <label className="label" htmlFor="new_password_confirm">
                <span className="label-text">
                  Confirm New Password{' '}
                  <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-bordered input-primary input w-full max-w-xs"
                {...register('new_password_confirm')}
                id="new_password_confirm"
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
              {errors.new_password_confirm && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.new_password_confirm.message}
                  </span>
                </label>
              )}
            </div>
            <div className="flex w-full flex-1 flex-col items-center sm:w-1/3">
              <label className="label w-fit" htmlFor="avatar">
                <span className="label-text">Profile picture</span>
              </label>
              <AvatarUpload
                hookFormControl={control}
                hookFormSetValue={setValue}
                hookFormWatch={watch}
                defaultValue={props.profileData.profileImg}
              />
              <p className="text-xs">Click or drop here to upload</p>
            </div>
          </div>

          <div className="divider"></div>

          <h2 className="-mx-4 mb-3 text-xl font-bold">Personal Information</h2>

          <div className="mb-2 flex w-full flex-wrap gap-4">
            <div className="relative mb-2 w-64 sm:mb-0">
              <label className="label w-fit" htmlFor="first_name">
                <span className="label-text">
                  First name <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input-bordered input-primary input w-full"
                {...register('first_name')}
                id="first_name"
                placeholder="Enter First name"
                autoComplete="given-name"
                required
              />
              {errors.first_name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.first_name.message}
                  </span>
                </label>
              )}
            </div>
            <div className="w-64">
              <label className="label w-fit" htmlFor="last_name">
                <span className="label-text">
                  Last name <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input-bordered input-primary input w-full"
                {...register('last_name')}
                id="last_name"
                placeholder="Enter Last name"
                autoComplete="family-name"
                required
              />
              {errors.last_name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.last_name.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <label className="label" htmlFor="email">
            <span className="label-text">
              Email Address <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <input
            type="email"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register('email')}
            id="email"
            placeholder="Enter Email Address"
            autoComplete="email"
            required
          />
          {errors.email && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            </label>
          )}
          <label className="label" htmlFor="phone">
            <span className="label-text">
              Phone number <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <input
            type="tel"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register('phone')}
            id="phone"
            placeholder="Enter Phone number"
            autoComplete="tel-national"
            minLength={10}
            maxLength={10}
            required
          />
          {errors.phone && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.phone.message}
              </span>
            </label>
          )}
          <label className="label" htmlFor="gender">
            <span className="label-text">
              Gender <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <select
            className="select-bordered select-primary select w-48"
            {...register('gender')}
            id="gender"
            defaultValue=""
            required
          >
            {errors.gender && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.gender.message}
                </span>
              </label>
            )}
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="not_specified">Not specified</option>
          </select>

          <div className="divider"></div>

          <h2 className="-mx-4 mb-3 text-xl font-bold">Platform Specifics</h2>

          <label className="label" htmlFor="preferred_subjects">
            <span className="label-text">Preferred subjects (max 10)</span>
          </label>
          <SubjectListForm
            hookFormRegister={register}
            hookFormErrors={errors}
            hookFormControl={control}
            hookFormWatch={watch}
            subjects={props.subjects}
            maxSubject={MAX_SUBJECT}
          />

          <div className="divider"></div>

          <div className="mx-auto flex w-fit flex-col justify-center gap-1">
            <input type="submit" className="btn btn-primary" value="Submit" />
            <button
              className="btn btn-ghost btn-sm"
              onClick={(evt) => {
                evt.preventDefault();
                reset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  //if (!session) {
  //return {
  //redirect: {
  //destination: '/login',
  //permanent: false,
  //},
  //};
  //}

  var subjects;
  try {
    const subjectsRes = await fetchWithTimeout(
      `http://${process.env.API_URL}/subject/getAllSubjectsLevel`,
      {
        timeout: 2000,
      }
    );
    if (!res.ok) {
      throw new Error('Fetch error');
    }
    const subjectsData = await subjectsRes.json();

    subjects = subjectsData;
  } catch (error) {
    subjects = {
      Mathmetic: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
      Physic: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
      Biology: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
      English: [
        { level: 'Middle School', id: '293817589231576' },
        { level: 'High School', id: '2309512231698' },
      ],
    };
  }

  var profileData;
  try {
    const res = await fetchWithTimeout(
      `http://${process.env.API_URL}/student/profile`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: session.user._id,
          // studentId: '62051ce13dd882be338c2d2b',
        }),
        timeout: 2000,
      }
    );
    if (!res.ok) {
      throw new Error('Fetch error');
    }
    const data = await res.json();

    console.log('done fetching');

    profileData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      id: data._id,
      profileImg: data.profileUrl,
      subjects: data.subjects,
    };
  } catch (error) {
    profileData = {
      firstName: 'John',
      lastName: 'Connor',
      username: 'lmao',
      gender: 'male',
      email: 'Nope@gmail.com',
      phone: '0633211212',
      id: '213096581239065',
      profileImg:
        'https://static.wikia.nocookie.net/8235f47d-e93c-4969-ac47-56d57e62569f',
      subjects: [
        { subject: 'Mathmetic', level: '293817589231576' },
        { subject: 'Biology', level: '2309512231698' },
      ],
    };
  }

  return {
    props: { profileData, subjects },
  };
}

export default StudentProfileEdit;

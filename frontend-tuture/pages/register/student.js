// import Multiselect from 'multiselect-react-dropdown';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import zxcvbn from 'zxcvbn';
import Layout from '../../components/Layout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

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
const MIN_PWD_LENGTH = 8;
const MAX_PWD_LENGTH = 30;
const MAX_USERNAME_LENGTH = 30;

function StudentRegister({ subjects, levels, avatarSeed }) {
  const specialCharRegex = /.*[!@#\$%\^\&*\)\(+=._-].*/g;
  const uppercaseRegex = /.*[A-Z].*/g;
  const lowercaseRegex = /.*[a-z].*/g;
  const numberRegex = /.*[0-9].*/g;
  const phoneRegex = /^\d{10}$/g;

  const schema = yup.object().shape({
    username: yup
      .string()
      .max(MAX_USERNAME_LENGTH, 'Username must not exceed 30 characters')
      .required(),
    new_password: yup
      .string()
      .min(MIN_PWD_LENGTH, 'Password must at least 8 characters')
      .max(MAX_PWD_LENGTH, 'Password must not exceed 30 characters')
      .matches(uppercaseRegex, 'Contains at least 1 uppercase letters')
      .matches(lowercaseRegex, 'Contains at least 1 lowercase letters')
      .matches(numberRegex, 'Contains at least 1 numerical letters')
      .matches(specialCharRegex, 'Contains at least 1 special letters')
      .test(
        'oneOfRequired',
        'Password is too weak',
        (value) => zxcvbn(value).score >= 2
      )
      .required(),
    new_password_confirm: yup
      .string()
      .oneOf(
        [yup.ref('new_password'), null],
        'Confirm password does not match with password'
      )
      .required(),
    first_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'First name must contain only alphabet')
      .required(),
    last_name: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'Last name must contain only alphabet')
      .required(),
    email: yup.string().email(),
    phone: yup
      .string()
      .matches(phoneRegex, 'Phone number must contain only number')
      .required(),
    gender: yup
      .string()
      .oneOf(['male', 'female', 'non-binary', 'not_specified'])
      .required(),
  });

  const [password, setPassword] = useState({ password: '', score: 0 });
  const [avatarFile, setAvatarFile] = useState({ preview: '', name: '' });
  const [firstName, setFirstName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onAvatarDrop(acceptedFiles) {
    try {
      setAvatarFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    return () => URL.revokeObjectURL(avatarFile.preview);
  }, [avatarFile]);

  function onPasswordChange(event) {
    const newPassword = event.target.value;
    const evaluation = zxcvbn(newPassword);
    setPassword({ password: newPassword, score: evaluation.score });
  }

  const fallbackAvatar =
    'https://ui-avatars.com/api/?background=random&&length=1' +
    (firstName !== '' ? '&&name=' + firstName[0] + `${avatarSeed}` : '');

  async function validateForm(event) {
    const total = availFormVals.length;
    var notError = true;

    return notError;
  }

  async function submitRegister(data) {
    // event.preventDefault();
    console.log(data);
    console.log('hello');
    // if (!(await validateForm(data))) {
    //   return;
    // }
    // router.push(
    //   {
    //     pathname: '/matching/result/[result]',
    //     query: {
    //       result: JSON.stringify({
    //         study_subject: event.target.study_subject.value,
    //         levels: event.target.edu_level.value,
    //         price_min: event.target.price_min.value,
    //         price_max: event.target.price_max.value,
    //         availability: availFormVals,
    //       }),
    //     },
    //   },
    //   '/matching/result/'
    // );
  }

  return (
    <Layout title="Register Student | Tuture" signedIn={false}>
      <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
        Create Student Account
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
                placeholder="Enter Username"
                autoComplete="username"
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
                  Password <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-bordered input-primary input w-full max-w-xs"
                {...register('new_password')}
                id="new_password"
                placeholder="Enter Password"
                autoComplete="new-password"
                required
                value={password.password}
                onChange={onPasswordChange}
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
                } ${
                  password.password.length === 0 ? 'invisible' : 'visible'
                } text-sm transition-all `}
              >
                {PWD_STRENGTH[password.score]}
              </p>
              <ul className="ml-8 list-disc">
                <li
                  className={`text-sm transition-colors ${
                    password.password.length === 0 ||
                    password.password.length >= 8
                      ? 'text-zinc-500/70'
                      : 'text-error'
                  }`}
                >
                  Contains at least 8 characters
                </li>
                <li
                  className={`text-sm transition-colors ${
                    password.password.length === 0 ||
                    uppercaseRegex.test(password.password)
                      ? 'text-zinc-500/70'
                      : 'text-error'
                  }`}
                >
                  Contains at least 1 uppercase letters
                </li>
                <li
                  className={`text-sm transition-colors ${
                    password.password.length === 0 ||
                    lowercaseRegex.test(password.password)
                      ? 'text-zinc-500/70'
                      : 'text-error'
                  }`}
                >
                  Contains at least 1 lowercase letters
                </li>
                <li
                  className={`text-sm transition-colors ${
                    password.password.length === 0 ||
                    numberRegex.test(password.password)
                      ? 'text-zinc-500/70'
                      : 'text-error'
                  }`}
                >
                  Contains at least 1 numerical letters
                </li>
                <li
                  className={`text-sm transition-colors ${
                    password.password.length === 0 ||
                    specialCharRegex.test(password.password)
                      ? 'text-zinc-500/70'
                      : 'text-error'
                  }`}
                >
                  Contains at least 1 special letters
                </li>
              </ul>
              <label className="label" htmlFor="new_password_confirm">
                <span className="label-text">
                  Confirm Password{' '}
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
                required
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
                <span className="label-text">Profile picture </span>
              </label>
              <Dropzone
                onDrop={onAvatarDrop}
                multiple={false}
                accept="image/jpeg,image/png"
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="w-fit">
                    <div className="avatar">
                      <div className="relative w-24 rounded-full sm:w-40">
                        <div
                          className="absolute rounded-full"
                          {...getRootProps()}
                        >
                          <input id="avatar" {...getInputProps()} />
                          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 text-primary opacity-0 transition-all hover:border-primary hover:opacity-100 sm:h-40 sm:w-40">
                            <FontAwesomeIcon
                              fixedWidth
                              icon={faCamera}
                              size="2x"
                            />
                          </div>
                        </div>
                        <img
                          src={
                            avatarFile.preview !== ''
                              ? avatarFile.preview
                              : fallbackAvatar
                          }
                          alt={
                            avatarFile.preview !== ''
                              ? avatarFile.name
                              : 'Avatar'
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
              <p className="text-xs">Click or drop here to upload</p>
            </div>
          </div>

          <div className="divider"></div>

          <h2 className="-mx-4 my-3 text-xl font-bold">Personal Information</h2>

          <div className="mb-2 flex w-full flex-wrap gap-4">
            <div className="relative mb-2 w-64 sm:mb-0">
              <label className="label w-fit" htmlFor="first_name">
                <span className="label-text">
                  First name <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                className="input-bordered input-primary input w-full"
                {...register('first_name')}
                id="first_name"
                placeholder="Enter First name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
          <label className="label" htmlFor="preferred_subjects">
            <span className="label-text">Preferred subjects</span>
          </label>
          {/* <Multiselect
            className="input-primary input max-w-xs"
            options={[
              { name: 'Option 1️⃣', id: 1 },
              { name: 'Option 2️⃣', id: 2 },
            ]} // Options to display in the dropdown
            displayValue="name"
          />
          <label className="label" htmlFor="preferred_subjects">
            <span className="label-text">Preferred subjects</span>
          </label>
          <Multiselect
            className="input-primary input max-w-xs"
            options={[
              { name: 'Option 1️⃣', id: 1 },
              { name: 'Option 2️⃣', id: 2 },
            ]} // Options to display in the dropdown
            displayValue="name"
          /> */}
          <div className="flex w-full justify-center">
            <input type="submit" className="btn btn-primary" value="Sign Up" />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const avatarSeed = String.fromCharCode(
    Math.floor(Math.random() * 26) + 'A'.charCodeAt(0)
  );
  try {
    const subjectsRes = await fetch(
      `http://${process.env.API_URL}/subject/getSubjects`
    );
    const subjectsData = await subjectsRes.json();
    const levelsRes = await fetch(
      `http://${process.env.API_URL}/subject/getLevels`
    );
    const levelsData = await levelsRes.json();

    return {
      props: {
        subjects: subjectsData.subjects,
        levels: levelsData.levels,
        avatarSeed: avatarSeed,
      },
    };
  } catch (error) {
    return {
      props: {
        subjects: ['Mathmetic', 'Physic', 'Biology', 'English'],
        levels: ['Middle School', 'High School'],
        avatarSeed: avatarSeed,
      },
    };
  }
}

export default StudentRegister;

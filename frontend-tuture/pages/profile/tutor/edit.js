// import Multiselect from 'multiselect-react-dropdown';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import Layout from '../../../components/Layout';
import {
  uppercaseRegex,
  lowercaseRegex,
  numberRegex,
  specialCharRegex,
} from '../../../components/commons/Regex';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { tutorRegisterSchema } from '../../../components/register-pages/TutorSchema';
import AvatarUpload from '../../../components/AvatarUpload';
import {
  METER_BG_COLOR,
  METER_TEXT_COLOR,
  MIN_PWD_LENGTH,
  PWD_STRENGTH,
  MAX_SUBJECT,
  MAX_AVAILABILITY,
} from '../../../components/register-pages/Constants';
import SubjectListForm from '../../../components/register-pages/SubjectListForm';
import AvailabilityListForm from '../../../components/register-pages/AvailabilityListForm';
import PriceRangeForm from '../../../components/register-pages/PriceRangeForm';
import { getSession } from 'next-auth/react';

function TutorProfileEdit(props) {
  // destringify date item
  if (props.profileData.availability) {
    props.profileData.availability = props.profileData.availability.map((e) => {
      return {
        from: new Date(e.from),
        to: new Date(e.to),
      };
    });
  }

  const [password, setPassword] = useState({ password: '', score: 0 });
  const [firstName, setFirstName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(tutorRegisterSchema),
  });

  function onPasswordChange(event) {
    const newPassword = event.target.value;
    const evaluation = zxcvbn(newPassword);
    setPassword({ password: newPassword, score: evaluation.score });
  }

  //const router = useRouter();
  // const schema = yup.object().shape({
  //   avail_date: yup.date(),
  //   avail_time_from: yup.string().required(),
  //   avail_time_to: yup
  //     .string()
  //     .required()
  //     .test('is-greater', 'end time should be greater', function (value) {
  //       const { avail_time_from } = this.parent;
  //       return moment(value, 'HH:mm').isSameOrAfter(
  //         moment(avail_time_from, 'HH:mm')
  //       );
  //     }),
  // });
  console.log(errors);

  async function validateForm(event) {
    const total = availFormVals.length;
    var notError = true;
    for (const e of availFormVals) {
      if (
        e.avail_date === '' &&
        e.avail_time_from === '' &&
        e.avail_time_to === '' &&
        total === 1
      ) {
        continue;
      } else if (
        e.avail_date !== '' &&
        e.avail_time_from !== '' &&
        e.avail_time_to !== ''
      ) {
        await schema
          .validate({
            avail_date: e.avail_date,
            avail_time_from: e.avail_time_from,
            avail_time_to: e.avail_time_to,
          })
          .catch((err) => {
            alert(err.message);
            notError = false;
          });
      } else {
        return false;
      }
    }
    return notError;
  }

  async function submitRegister(data) {
    // event.preventDefault();
    console.log(data);
    console.log(data.availability);
    console.log('Pass');
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
    <Layout title="Register Tutor | Tuture" signedIn={false}>
      <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
        Create Tutor Account
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
                {...register('username', { value: props.profileData.username })}
                id="username"
                type="text"
                placeholder="Enter Username"
                name="username"
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
                    password.password.length >= MIN_PWD_LENGTH
                      ? 'text-zinc-500/70'
                      : 'text-error'
                  }`}
                >
                  Contains at least {MIN_PWD_LENGTH} characters
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
              <AvatarUpload
                hookFormControl={control}
                hookFormSetValue={setValue}
                firstName={firstName}
                //avatarSeed={avatarSeed}
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
                {...register('first_name', {
                  value: props.profileData.firstName,
                })}
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
                type="text"
                className="input-bordered input-primary input w-full"
                {...register('last_name', {
                  value: props.profileData.lastName,
                })}
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
            {...register('email', { value: props.profileData.email })}
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
            {...register('phone', { value: props.profileData.phone })}
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
            {...register('gender', { value: props.profileData.gender })}
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

          <h2 className="-mx-4 my-3 text-xl font-bold">Platform Specifics</h2>

          <label className="label" htmlFor="teaching_subjects">
            <span className="label-text">Teaching subjects (max 10)</span>
          </label>
          <SubjectListForm
            hookFormRegister={register}
            hookFormErrors={errors}
            hookFormControl={control}
            hookFormWatch={watch}
            subjects={props.subjects}
            maxSubject={MAX_SUBJECT}
            defaultValues={props.profileData.subjects}
          />
          {errors.subjects && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.subjects.message}
              </span>
            </label>
          )}
          <label htmlFor="price_range" className="label">
            <span className="label-text">Price Range</span>
          </label>
          <PriceRangeForm
            hookFormRegister={register}
            defaultValue={[
              props.profileData.priceMin,
              props.profileData.priceMax,
            ]}
          />
          {errors.subjects && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.subjects.message}
              </span>
            </label>
          )}
          {errors.price && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.price.message}
              </span>
            </label>
          )}
          <label className="label" htmlFor="availability">
            <span className="label-text">Availability (max 10)</span>
          </label>
          <AvailabilityListForm
            hookFormControl={control}
            maxAvailability={MAX_AVAILABILITY}
            defaultValues={props.profileData.availability}
          />
          {errors.availability && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.availability.message}
              </span>
            </label>
          )}

          <div className="divider"></div>
          <div className="flex w-full justify-center">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  var subjects;
  try {
    const subjectsRes = await fetch(
      `http://${process.env.API_URL}/subject/getAllSubjectsLevel`
    );
    if (!subjectsRes.ok) {
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
    const res = await fetch(`http://${process.env.API_URL}/student/profile`, {
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
    });
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
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      availability: data.availability,
      profileImg: data.profileUrl,
      subjects: data.subjects,
      //availability: need to stringify
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
      priceMin: 1112,
      priceMax: 1150,
      subjects: [
        { subject: 'Mathmetic', level: '293817589231576' },
        { subject: 'Biology', level: '2309512231698' },
      ],
      availability: [
        { from: new Date('May 23, 2022'), to: new Date('Aug 8, 2022') },
        { from: new Date('Sep 30, 2022'), to: new Date('Oct 30, 2022') },
      ],
    };
  }

  // stringify date item
  if (profileData.availability) {
    profileData.availability = profileData.availability.map((e) => {
      return {
        from: e.from.toJSON(),
        to: e.to.toJSON(),
      };
    });
  }

  return {
    props: { profileData, subjects },
  };
}
export default TutorProfileEdit;

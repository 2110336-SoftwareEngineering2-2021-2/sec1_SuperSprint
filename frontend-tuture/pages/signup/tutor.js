import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { tutorRegisterSchema } from '../../components/signup-pages/TutorSchema';
import AvatarUpload from '../../components/AvatarUpload';
import {
  MAX_SUBJECT,
  MAX_AVAILABILITY,
} from '../../components/signup-pages/Constants';
import Layout from '../../components/Layout';
import SubjectListForm from '../../components/signup-pages/SubjectListForm';
import AvailabilityListForm from '../../components/signup-pages/AvailabilityListForm';
import PriceRangeForm from '../../components/signup-pages/PriceRangeForm';
import { PasswordField } from '../../components/signup-pages/PasswordField';

function TutorRegister({ subjects }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setFocus,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      new_password: '',
      new_password_confirm: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
      price: {
        min: 2500,
        max: 4500,
      },
      avatar: { preview: '', name: '', file: '' },
      subjects: [{ subject: '', level: '' }],
      availability: [{ from: null, to: null }],
    },
    resolver: yupResolver(tutorRegisterSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  async function submitRegister(data) {
    // event.preventDefault();
    console.log('Pass');
    // console.log(data);
    const formData = new FormData();

    console.log(
      'subjects',
      data.subjects.map((e) => e.level)
    );

    formData.append('image', data.avatar.file || '');

    formData.append('username', data.username);
    formData.append('password', data.new_password);
    formData.append('firstName', data.first_name);
    formData.append('lastName', data.last_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('gender', data.gender);
    data.subjects.map((e) => {
      if (e.level) {
        formData.append('teachSubject', e.level);
      }
    });
    formData.append('priceMin', data.price.min);
    formData.append('priceMax', data.price.max);

    if (data.availability[0].from && data.availability[0].to) {
      formData.append(
        'dutyTime',
        JSON.stringify(
          data.availability.map((e) => {
            if (e.from && e.to) {
              return { start: e.from, end: e.to };
            }
          })
        )
      );
    }
    // formData.append('image', data.);

    try {
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        body: formData,
      };

      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup/tutor`,
        options
      );
      if (!res.ok) {
        const err = await res.json();
        console.error(err.message);
        throw new Error(err.message || 'Fetch Error');
      }
      const res_data = await res.json();
      console.log(res_data);
      setLoading(false);
      toast('Sign Up Success!', {
        onClose: () => {
          router.push('/signin');
        },
      });
    } catch (error) {
      switch (error.message) {
        case 'duplicate email':
          setFetchError({
            location: ['email'],
            message: error.message,
          });
          setFocus('email');
          break;
        case 'duplicate username':
          setFetchError({
            location: ['username'],
            message: error.message,
          });
          setFocus('username');
          break;
        case 'duplicate username and email':
          setFetchError({
            location: ['username', 'email'],
            message: error.message,
          });
          setFocus('username');
          break;
      }
    }
    setLoading(false);
  }

  console.log(errors);

  return (
    <Layout title="Sign Up Tutor | Tuture">
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
          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <div className="w-full flex-[2] sm:w-2/3">
              <label className="label" htmlFor="username">
                <span className="label-text">
                  Username <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                {...register('username')}
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
              {fetchError && fetchError?.location.includes('username') && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {fetchError.message}
                  </span>
                </label>
              )}
              <label className="label" htmlFor="new_password">
                <span className="label-text">
                  Password <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <PasswordField
                hookFormRegister={register}
                hookFormErrors={errors}
              />
              <label className="label" htmlFor="new_password_confirm">
                <span className="label-text">
                  Confirm Password{' '}
                  <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered input-primary w-full max-w-xs"
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
            <div className="flex w-fit flex-1 flex-col items-center sm:w-1/3">
              <label className="label w-fit" htmlFor="avatar">
                <span className="label-text">Profile picture </span>
              </label>
              <AvatarUpload hookFormControl={control} hookFormWatch={watch} />
              <p className="text-xs">Click or drop here to upload</p>
            </div>
          </div>

          <div className="divider"></div>

          <h2 className="-mx-4 mb-3 text-xl font-bold">Personal Information</h2>

          <div className="mb-2 flex w-full flex-wrap gap-0 sm:gap-4">
            <div className="relative mb-2 w-64 sm:mb-0">
              <label className="label w-fit" htmlFor="first_name">
                <span className="label-text">
                  First name <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered input-primary w-full"
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
                className="input input-bordered input-primary w-full"
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
            className="input input-bordered input-primary w-full max-w-xs"
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
          {fetchError && fetchError?.location.includes('email') && (
            <label className="label">
              <span className="label-text-alt text-error">
                {fetchError.message}
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
            className="input input-bordered input-primary w-full max-w-xs"
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
            className="select select-bordered select-primary w-48"
            {...register('gender')}
            id="gender"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            {/* <option value="non-binary">Non-binary</option>
            <option value="not_specified">Not specified</option> */}
          </select>
          {errors.gender && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.gender.message}
              </span>
            </label>
          )}
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
            subjects={subjects}
            maxSubject={MAX_SUBJECT}
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
            hookFormControl={control}
            hookFormWatch={watch}
            hookFormSetValue={setValue}
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
            hookFormErrors={errors}
            maxAvailability={MAX_AVAILABILITY}
          />
          {errors.availability && errors.availability?.message && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.availability.message}
              </span>
            </label>
          )}

          <div className="divider"></div>

          <div className="mx-auto flex w-fit flex-col justify-center gap-1">
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {!loading ? (
                'Submit'
              ) : (
                <FontAwesomeIcon fixedWidth icon={faSpinner} spin />
              )}
            </button>
            <button
              disabled={loading}
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
  try {
    const subjectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/getAllSubjectsLevel`
    );
    const subjectsData = await subjectsRes.json();

    return {
      props: {
        subjects: subjectsData,
      },
    };
  } catch (error) {
    return {
      props: {
        subjects: {
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
        },
      },
    };
  }
}

export default TutorRegister;

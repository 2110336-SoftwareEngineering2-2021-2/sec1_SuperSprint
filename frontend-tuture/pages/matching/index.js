import { useState } from 'react';
import Slider from 'rc-slider';
import Layout from '../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PriceRangeForm from '../../components/signup-pages/PriceRangeForm';

const { Range } = Slider;

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

function AvailabilityForm({
  formVal,
  lastElement,
  onButtonClick,
  onFieldChange,
  reactMax,
}) {
  return (
    <div className="m-auto flex w-full items-center sm:m-auto sm:block">
      <div className="grid grid-cols-11 items-center justify-center gap-2 sm:inline-flex sm:flex-nowrap">
        <input
          type="date"
          id="avail_date"
          min={new Date().toISOString().split('T')[0]}
          value={formVal.avail_date || ''}
          onChange={(e) => onFieldChange(e)}
          className="input input-bordered input-primary input-sm col-span-11 inline-block"
        />
        <input
          type="time"
          id="avail_time_from"
          value={formVal.avail_time_from || ''}
          onChange={(e) => onFieldChange(e)}
          className="input input-bordered input-primary input-sm col-span-5 inline-block sm:w-32"
        />
        <span className="col-span-1 w-4 text-center">-</span>
        <input
          type="time"
          id="avail_time_to"
          value={formVal.avail_time_to || ''}
          onChange={(e) => onFieldChange(e)}
          className="input input-bordered input-primary input-sm col-span-5 inline-block sm:w-32"
        />
      </div>
    </div>
  );
}

function Matching({ subjects }) {
  const [priceRange, setPriceRange] = useState([2000, 4500]);
  const [availFormVals, setAvailFormVals] = useState([
    { avail_date: '', avail_time_from: '', avail_time_to: '' },
  ]);
  const router = useRouter();
  const schema = yup.object().shape({
    study_subject: yup.string().required('Subject is required'),
    edu_level: yup.string().required('Education level is required'),
    price: yup.object().shape({
      min: yup.number('Min price must be contain only number'),
      max: yup.number('Max price must be contain only number'),
    }),
    availability: yup.object().shape({
      avail_date: yup.string().required('Date is required'),
      avail_time_from: yup
        .string()
        .required('Start time is required')
        .test(
          'not-past',
          'Start time must not be in the past',
          function (value) {
            const { avail_date } = this.parent;
            const currentDate = new Date(avail_date + 'T' + value);
            console.log(avail_date);
            console.log(currentDate, '\n', new Date());
            return new Date() <= currentDate;
          }
        ),
      avail_time_to: yup
        .string()
        .required('End time is required')
        .test('is-greater', 'End time should be greater', function (value) {
          const { avail_time_from } = this.parent;
          return moment(value, 'HH:mm').isSameOrAfter(
            moment(avail_time_from, 'HH:mm')
          );
        }),
    }),
  });

  const {
    register,
    control,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      study_subject: '',
      edu_level: '',
      price: { min: 2000, max: 4500 },
      availability: { avail_date: '', avail_time_from: '', avail_time_to: '' },
    },
    resolver: yupResolver(schema),
  });

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

  async function submitMatching(data) {
    // console.log(data);
    router.push(
      {
        pathname: '/matching/result/[result]',
        query: {
          result: JSON.stringify({
            study_subject: data.study_subject,
            levels: data.edu_level,
            price_min: data.price.min,
            price_max: data.price.max,
            availability: [
              {
                avail_time_from: new Date(
                  data.availability.avail_date +
                    'T' +
                    data.availability.avail_time_from
                ),
                avail_time_to: new Date(
                  data.availability.avail_date +
                    'T' +
                    data.availability.avail_time_to
                ),
              },
            ],
          }),
        },
      },
      '/matching/result/'
    );
  }

  console.log(errors);

  return (
    <Layout title="Matching | Tuture">
      <div className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold">Matching</h2>

        <form
          className="w-full max-w-2xl p-2"
          id="matching_form"
          onSubmit={handleSubmit(submitMatching)}
        >
          <div className="-mx-3 mb-2 flex flex-wrap">
            <div className="relative mb-2 w-full px-3 sm:mb-0 sm:w-1/2">
              <label className="label" htmlFor="study_subject">
                <span className="label-text">
                  Subject <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <div>
                <select
                  className="select select-bordered select-primary w-full"
                  {...register('study_subject')}
                >
                  <option value="" disabled>
                    {' '}
                    Select your subject{' '}
                  </option>
                  {Object.keys(subjects).map((e, idx) => (
                    <option key={idx} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              {errors.study_subject && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.study_subject.message}
                  </span>
                </label>
              )}
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <label className="label" htmlFor="edu_level">
                <span className="label-text">
                  Education Level{' '}
                  <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <select
                  className="select select-bordered select-primary w-full"
                  {...register('edu_level')}
                  disabled={watch('study_subject') === ''}
                >
                  <option value="" disabled>
                    {' '}
                    Select your education level{' '}
                  </option>
                  {watch('study_subject') !== '' &&
                    subjects[watch('study_subject')]?.map((e, idx) => (
                      <option key={idx} value={e.id}>
                        {e.level}
                      </option>
                    ))}
                </select>
              </div>
              {errors.edu_level && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.edu_level.message}
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="divider" />

          <div className="m-auto">
            <label htmlFor="price_range" className="label">
              <span className="label-text">
                Price Range <span className="label-text text-red-500">*</span>
              </span>
            </label>
            <PriceRangeForm
              hookFormControl={control}
              hookFormWatch={watch}
              hookFormSetValue={setValue}
            />
          </div>

          <div className="divider" />

          <div className="m-auto w-full">
            <label className="label mb-4">
              <span className="label-text">
                Availability <span className="label-text text-red-500">*</span>
              </span>
            </label>
            <div className="m-auto w-fit px-2">
              <div className="m-auto flex w-full items-center sm:m-auto sm:block">
                <div className="grid grid-cols-11 items-center justify-center gap-2 sm:inline-flex sm:flex-nowrap">
                  <input
                    type="date"
                    {...register('availability.avail_date')}
                    id="avail_date"
                    min={new Date().toISOString().split('T')[0]}
                    className="input input-bordered input-primary input-sm col-span-11 inline-block"
                  />
                  <input
                    type="time"
                    {...register('availability.avail_time_from')}
                    id="avail_time_from"
                    className="input input-bordered input-primary input-sm col-span-5 inline-block sm:w-32"
                  />
                  <span className="col-span-1 w-4 text-center">-</span>
                  <input
                    type="time"
                    {...register('availability.avail_time_to')}
                    id="avail_time_to"
                    className="input input-bordered input-primary input-sm col-span-5 inline-block sm:w-32"
                  />
                </div>

                {errors.availability?.avail_date && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.availability?.avail_date.message}
                    </span>
                  </label>
                )}
                {errors.availability?.avail_time_from && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.availability?.avail_time_from.message}
                    </span>
                  </label>
                )}
                {errors.availability?.avail_time_to && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.availability?.avail_time_to.message}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="divider" />
          <div className="mx-auto flex w-fit flex-col justify-center gap-1">
            <input type="submit" className="btn btn-primary" value="Match" />
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

export default Matching;

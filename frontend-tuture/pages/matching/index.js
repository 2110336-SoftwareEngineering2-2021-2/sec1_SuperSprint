import { useState } from 'react';
import Slider from 'rc-slider';
import Layout from '../../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import moment from 'moment';

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
      {/* <button
        type="button"
        className="btn btn-primary xs:btn-sm btn-xs btn-outline mx-2 inline-block w-fit grow-0 rounded-full text-center"
        onClick={onButtonClick}
        disabled={lastElement && reactMax}
      >
        <FontAwesomeIcon
          size="sm"
          icon={lastElement ? faPlus : faMinus}
          fixedWidth
        />
      </button> */}
    </div>
  );
}

function Matching({ subjects, levels }) {
  const [priceRange, setPriceRange] = useState([2000, 4500]);
  const [availFormVals, setAvailFormVals] = useState([
    { avail_date: '', avail_time_from: '', avail_time_to: '' },
  ]);
  const router = useRouter();
  const schema = yup.object().shape({
    avail_date: yup.date(),
    avail_time_from: yup.string().required(),
    avail_time_to: yup
      .string()
      .required()
      .test('is-greater', 'end time should be greater', function (value) {
        const { avail_time_from } = this.parent;
        return moment(value, 'HH:mm').isSameOrAfter(
          moment(avail_time_from, 'HH:mm')
        );
      }),
  });

  function setMinPriceRange(event) {
    let newPriceRange = [...priceRange];
    newPriceRange[0] = event.target.value;
    setPriceRange(newPriceRange);
  }

  function setMaxPriceRange(event) {
    let newPriceRange = [...priceRange];
    newPriceRange[1] = event.target.value;
    setPriceRange(newPriceRange);
  }

  function validatePriceRange() {
    let newPriceRange = [...priceRange];
    newPriceRange[0] = Math.min(
      newPriceRange[1],
      Math.max(newPriceRange[0], MIN_PRICE)
    );
    newPriceRange[1] = Math.max(
      newPriceRange[0],
      Math.min(newPriceRange[1], MAX_PRICE)
    );
    setPriceRange(newPriceRange);
  }

  function addAvailField() {
    setAvailFormVals([
      ...availFormVals,
      { avail_date: '', avail_time_from: '', avail_time_to: '' },
    ]);
  }

  function removeAvailField(idx) {
    let newFormVals = [...availFormVals];
    newFormVals.splice(idx, 1);
    setAvailFormVals(newFormVals);
  }

  function handleAvailFieldChange(idx, event) {
    let newFormVals = [...availFormVals];
    newFormVals[idx][event.target.id] = event.target.value;
    setAvailFormVals(newFormVals);
  }
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
  async function submitMatching(event) {
    event.preventDefault();
    if (!(await validateForm(event))) {
      return;
    }
    // console.log({
    //   study_subject: event.target.study_subject.value,
    //   levels: event.target.edu_level.value,
    //   price_min: event.target.price_min.value,
    //   price_max: event.target.price_max.value,
    //   availability: availFormVals,
    // });
    router.push(
      {
        pathname: '/matching/result/[result]',
        query: {
          result: JSON.stringify({
            study_subject: event.target.study_subject.value,
            levels: event.target.edu_level.value,
            price_min: event.target.price_min.value,
            price_max: event.target.price_max.value,
            availability: availFormVals,
          }),
        },
      },
      '/matching/result/'
    );
  }

  return (
    <Layout title="Matching | Tuture">
      <div className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold">Matching</h2>

        <form
          className="w-full max-w-2xl p-2"
          id="matching_form"
          onSubmit={submitMatching}
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
                  id="study_subject"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    {' '}
                    Select your subject{' '}
                  </option>
                  {subjects.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
              </div>
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
                  id="edu_level"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    {' '}
                    Select your education level{' '}
                  </option>
                  {levels.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="divider" />

          <div className="m-auto">
            <label htmlFor="price_range" className="label">
              <span className="label-text">Price Range</span>
            </label>
            <div className="m-auto mb-4 w-11/12">
              <Range
                id="price_range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={50}
                value={priceRange}
                allowCross={false}
                onChange={(val) => setPriceRange(val)}
                trackStyle={[{ backgroundColor: '#ffc400' }]}
                handleStyle={[
                  { borderColor: '#ffc400' },
                  { borderColor: '#ffc400' },
                ]}
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <label
                className="input-group input-group-xs w-5/12 sm:w-3/12"
                htmlFor="price_min"
              >
                <input
                  id="price_min"
                  type="number"
                  value={priceRange[0]}
                  className="min-w-2/3 sm:min-w-1/2 input input-bordered input-primary input-sm w-full"
                  onChange={(event) => setMinPriceRange(event)}
                  onBlur={validatePriceRange}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                />
                <span>THB</span>
              </label>
              <span className="select-none">-</span>
              <label
                className="input-group input-group-xs right-0 w-5/12 sm:w-3/12"
                htmlFor="price_max"
              >
                <input
                  id="price_max"
                  type="number"
                  value={priceRange[1]}
                  className="min-w-2/3 sm:min-w-1/2 input input-bordered input-primary input-sm w-full"
                  onChange={(event) => setMaxPriceRange(event)}
                  onBlur={validatePriceRange}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                />
                <span>THB</span>
              </label>
            </div>
          </div>

          <div className="divider" />

          <div className="m-auto w-full">
            <label className="label mb-4">
              <span className="label-text">Availability (max 1)</span>
            </label>
            <div className="m-auto w-fit px-2">
              {/* Slice for shallow copy and reverse, making original array unchanged */}
              {availFormVals
                .map((item, idx) => (
                  <AvailabilityForm
                    key={idx}
                    formVal={item}
                    lastElement={idx === availFormVals.length - 1}
                    reactMax={availFormVals.length === 1}
                    onButtonClick={
                      idx === availFormVals.length - 1
                        ? addAvailField
                        : () => removeAvailField(idx)
                    }
                    onFieldChange={(event) =>
                      handleAvailFieldChange(idx, event)
                    }
                  />
                ))
                .reverse()
                .reduce((prev, curr, idx) => [
                  prev,
                  <div key={idx} className="divider" />,
                  curr,
                ])}
            </div>
          </div>

          <div className="divider" />
          <div className="flex w-full justify-center">
            <input
              type="submit"
              className="btn btn-primary btn-sm rounded-full"
              value="Match"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const subjectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/getAllSubjectsName`
    );
    const subjectsData = await subjectsRes.json();
    const levelsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/getAllLevels`
    );
    const levelsData = await levelsRes.json();

    return {
      props: {
        subjects: subjectsData.subjects,
        levels: levelsData.levels,
      },
    };
  } catch (error) {
    return {
      props: {
        subjects: ['Mathmetic', 'Physic', 'Biology', 'English'],
        levels: ['Middle School', 'High School'],
      },
    };
  }
}

export default Matching;

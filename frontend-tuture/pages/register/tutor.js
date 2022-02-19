// import Multiselect from 'multiselect-react-dropdown';
import { faCamera, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import zxcvbn from 'zxcvbn';
import Layout from '../../components/Layout';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';

const { Range } = Slider;

const MIN_PRICE = 0;
const MAX_PRICE = 10000;
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

function AvailabilityForm({
  formVal,
  lastElement,
  onButtonClick,
  onFieldChange,
  reactMax,
}) {
  return (
    <div
      className={`flex w-fit flex-wrap items-center gap-2 ${
        lastElement ? '' : 'mb-4'
      }`}
    >
      <div className="flex w-fit flex-col items-center gap-0 sm:flex-row sm:gap-2">
        <DateTimePicker
          value={formVal[0]}
          format="y-MM-dd hh:mm a"
          onChange={(value) => onFieldChange(0, value)}
          strictParsing={true}
          className="input-bordered input-primary input input-sm w-[15.7rem] md:input-md md:w-[16.7rem]"
        />
        <span>-</span>
        <DateTimePicker
          value={formVal[1]}
          format="y-MM-dd h:mm a"
          onChange={(value) => onFieldChange(1, value)}
          strictParsing={true}
          className="input-bordered input-primary input input-sm w-[15.7rem] md:input-md md:w-[16.7rem]"
        />
      </div>

      <button
        type="button"
        className="btn-outline btn btn-primary btn-xs inline-block w-fit grow-0 rounded-full text-center xs:btn-sm"
        onClick={onButtonClick}
        disabled={lastElement && reactMax}
      >
        <FontAwesomeIcon
          size="sm"
          icon={lastElement ? faPlus : faMinus}
          fixedWidth
        />
      </button>
    </div>
  );
}

function TutorRegister({ subjects, levels, avatarSeed }) {
  const specialCharRegex = /.*[!@#\$%\^\&*\)\(+=._-].*/g;
  const uppercaseRegex = /.*[A-Z].*/g;
  const lowercaseRegex = /.*[a-z].*/g;

  const [password, setPassword] = useState({ password: '', score: 0 });
  const [avatarFile, setAvatarFile] = useState({ preview: '', name: '' });
  const [firstName, setFirstName] = useState('');
  const [priceRange, setPriceRange] = useState([2000, 4500]);
  const [availFormVals, setAvailFormVals] = useState([[null, null]]);

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
    setAvailFormVals([...availFormVals, [null, null]]);
  }

  function removeAvailField(idx) {
    let newFormVals = [...availFormVals];
    newFormVals.splice(idx, 1);
    setAvailFormVals(newFormVals);
  }

  function handleAvailFieldChange(idx, id, value) {
    let newFormVals = [...availFormVals];
    console.log(value);
    newFormVals[idx][id] = value;
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

  return (
    <Layout title="Register Student | Tuture" signedIn={false}>
      <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
        Create Student Account
      </h1>
      <div className="container mx-auto my-4">
        <form
          className="form-control mx-auto w-full max-w-3xl rounded-md py-4 px-8 shadow-md"
          id="student_register_form"
          // onSubmit={submitMatching}
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
                id="username"
                placeholder="Enter Username"
                autoComplete="username"
                required
              />
              <label className="label" htmlFor="new_password">
                <span className="label-text">
                  Password <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                className="input-bordered input-primary input w-full max-w-xs"
                id="new_password"
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
                id="new_password_confirm"
                placeholder="Confirm Password"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="flex w-full flex-1 flex-col items-center sm:w-1/3">
              <label className="label w-fit">
                <span className="label-text">Profile picture </span>
              </label>
              <Dropzone onDrop={onAvatarDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <div className="w-fit">
                    <div className="avatar">
                      <div className="relative w-24 rounded-full sm:w-40">
                        <div
                          className="absolute rounded-full"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
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
                id="first_name"
                placeholder="Enter First name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="w-64">
              <label className="label w-fit" htmlFor="last_name">
                <span className="label-text">
                  Last name <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <input
                className="input-bordered input-primary input w-full"
                id="last_name"
                placeholder="Enter Last name"
                autoComplete="family-name"
                required
              />
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
            id="email"
            placeholder="Enter Email Address"
            autoComplete="email"
            required
          />
          <label className="label" htmlFor="email">
            <span className="label-text">
              Phone number <span className="label-text text-red-500">*</span>
            </span>
          </label>
          <input
            type="tel-national"
            className="input-bordered input-primary input w-full max-w-xs"
            id="tel-national"
            placeholder="Enter Phone number"
            autoComplete="tel-national"
            required
          />
          <label className="label" htmlFor="phone_number">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select-bordered select-primary select w-48"
            id="gender"
            defaultValue=""
          >
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
          <label htmlFor="price_range" className="label">
            <span className="label-text">Price Range</span>
          </label>
          <div className="m-auto my-4 w-11/12">
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
          <div className="my-2 flex w-full items-center justify-between">
            <label
              className="input-group-xs input-group w-5/12 sm:w-3/12"
              htmlFor="price_min"
            >
              <input
                id="price_min"
                type="number"
                value={priceRange[0]}
                className="min-w-2/3 sm:min-w-1/2 input-bordered input-primary input input-sm w-full"
                onChange={(event) => setMinPriceRange(event)}
                onBlur={validatePriceRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
              />
              <span>THB</span>
            </label>
            <span className="select-none">-</span>
            <label
              className="input-group-xs input-group right-0 w-5/12 sm:w-3/12"
              htmlFor="price_max"
            >
              <input
                id="price_max"
                type="number"
                value={priceRange[1]}
                className="min-w-2/3 sm:min-w-1/2 input-bordered input-primary input input-sm w-full"
                onChange={(event) => setMaxPriceRange(event)}
                onBlur={validatePriceRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
              />
              <span>THB</span>
            </label>
          </div>

          <label className="label" htmlFor="availability">
            <span className="label-text">Availability (max 10)</span>
          </label>
          <div className="my-2">
            {availFormVals.map((item, idx) => (
              <AvailabilityForm
                key={idx}
                formVal={item}
                lastElement={idx === availFormVals.length - 1}
                reactMax={availFormVals.length === 10}
                onButtonClick={
                  idx === availFormVals.length - 1
                    ? addAvailField
                    : () => removeAvailField(idx)
                }
                onFieldChange={(id, value) =>
                  handleAvailFieldChange(idx, id, value)
                }
              />
            ))}
          </div>
          <div className="divider"></div>
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

export default TutorRegister;

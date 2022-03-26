import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faPaperPlane,
  faImage,
  faCalendarAlt,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../Modal';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useSession } from 'next-auth/react';

const MIN_PRICE = 0;
const MAX_PRICE = 240000;

const schema = yup.object().shape({
  date: yup.date().typeError('Date is a required field'),
  timeFrom: yup.string().required('Start time is a required field'),
  timeTo: yup
    .string()
    .required('End time is a required field')
    .test('is-greater', 'end time should be greater', function (value) {
      const { timeFrom } = this.parent;
      return moment(value, 'HH:mm').isSameOrAfter(moment(timeFrom, 'HH:mm'));
    }),
  subject: yup.string().min(1, 'Subject is a required field'),
  level: yup.string().min(1, 'Level is a required field'),
});

export default function MessageForm({ subjectList }) {
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
      price: 10,
      subject: '',
      level: '',
    },
    resolver: yupResolver(schema),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function submitAppointment(data) {
    closeModal();
    console.log(data);
  }

  return (
    <>
      <div className="mx-auto flex w-fit justify-items-center space-x-3 pb-2 pt-2">
        <div className="flex items-center">
          <div className="dropdown-top dropdown">
            <button
              tabIndex="0"
              className="btn btn-circle btn-ghost border-transparent"
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="2xl"
                fixedWidth
                color="primary"
              />
            </button>
            <ul
              tabindex="0"
              className="w-500 dropdown-content menu rounded-box mb-3 bg-base-100 p-4 shadow-lg"
            >
              <li className="flex w-max">
                <a href="#my-modal-2" className="btn btn-ghost justify-start">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="xl"
                    fixedWidth
                    color="primary"
                  />
                  <span>Send Photo</span>
                </a>
              </li>
              {session.user.role === 'tutor' && (
                <li className="flex w-max">
                  <a
                    className="btn btn-ghost justify-start"
                    onClick={openModal}
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="xl"
                      fixedWidth
                      color="primary"
                    />
                    <span className="inline-block">Request Appointment</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="relative flex items-center justify-end">
          <input
            type="text"
            placeholder="Enter your message"
            className="input input-bordered input-primary input-warning w-full max-w-screen-md bg-base-100 md:w-screen"
          />
          <button
            tabIndex="0"
            className="btn btn-circle btn-ghost btn-sm absolute right-3 border-transparent bg-base-100"
          >
            <FontAwesomeIcon
              icon={faSmile}
              size="xl"
              fixedWidth
              color="primary"
            />
          </button>
        </div>

        <div className="flex items-center">
          <button className="btn btn-ghost">
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="xl"
              fixedWidth
              color="primary"
            />
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title="Request Appointment"
        onClose={closeModal}
        onSubmit={() => {
          handleSubmit(submitAppointment)();
        }}
        onCancel={() => {
          reset();
          closeModal();
        }}
        submitBtnText="Request"
        cancelBtnText="Cancel"
      >
        <form
          className="form-control"
          onSubmit={handleSubmit(submitAppointment)}
        >
          <label class="label">
            <span class="label-text">Date</span>
          </label>
          <input
            type="date"
            {...register('date')}
            min={new Date().toISOString().split('T')[0]}
            className="input input-bordered input-primary"
          />
          {errors.date && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.date.message}
              </span>
            </label>
          )}

          <label class="label">
            <span class="label-text">Time</span>
          </label>
          <div className="m-auto flex w-full items-center sm:m-auto sm:block">
            <div className="grid grid-cols-11 items-center justify-center gap-2 sm:inline-flex sm:flex-nowrap">
              <input
                type="time"
                {...register('timeFrom')}
                className="input input-bordered input-primary col-span-5 inline-block w-36"
              />
              <span className="col-span-1 w-4 text-center">-</span>
              <input
                type="time"
                {...register('timeTo')}
                className="input input-bordered input-primary col-span-5 inline-block w-36"
              />
            </div>
          </div>
          {errors.timeFrom && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.timeFrom.message}
              </span>
            </label>
          )}
          {errors.timeTo && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.timeTo.message}
              </span>
            </label>
          )}

          <label class="label">
            <span class="label-text">Price</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              placeholder="1150"
              className="input input-bordered input-primary"
              {...register('price')}
            />
            <span>THB</span>
          </label>
          {errors.price && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.price.message}
              </span>
            </label>
          )}

          <label class="label">
            <span class="label-text">Subject</span>
          </label>
          <select
            type="text"
            className="input input-bordered input-primary"
            {...register('subject')}
          >
            <option value="" disabled>
              Select subject
            </option>
            {Object.keys(subjectList).map((e, idx) => (
              <option key={idx} value={e}>
                {e}
              </option>
            ))}
          </select>
          {errors.subject && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.subject.message}
              </span>
            </label>
          )}

          <label class="label">
            <span class="label-text">Level</span>
          </label>
          <select
            type="text"
            className="input input-bordered input-primary"
            {...register('level')}
            disabled={watch('subject') === ''}
          >
            <option value="" disabled>
              Select level
            </option>
            {watch('subject') !== '' &&
              subjectList[watch('subject')]?.map((e, idx) => (
                <option key={idx} value={e.id}>
                  {e.level}
                </option>
              ))}
          </select>
          {errors.level && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.level.message}
              </span>
            </label>
          )}
        </form>
      </Modal>
    </>
  );
}

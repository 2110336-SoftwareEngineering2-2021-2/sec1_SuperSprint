import {
  faBookOpen,
  faGraduationCap,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import avatarUrl from '../../lib/avatarUrl';
import moment from 'moment';

function AppointmentCard({
  studentId,
  firstName,
  lastName,
  profileImg,
  subjects,
  levels,
  createdDate,
  apptDate,
  accepted = false,
  onCardClick,
  onAccept,
  onDecline,
}) {
  const [showCard, setShowCard] = useState(false);
  // console.log(studentId);

  useEffect(() => {
    setShowCard(true);
  }, []);

  function onChoose(event) {
    if (typeof onChooseClick == 'function') {
      onChooseClick();
    }
    event.stopPropagation(); // Prevent button click from firing card click
  }

  return (
    <Transition
      appear={true}
      show={showCard}
      enter="transform transition duration-[400ms]"
      enterFrom="opacity-0 translate-y-10"
      enterTo="opacity-100 translate-y-0"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 scale-100 "
      leaveTo="opacity-0 scale-95"
    >
      <div
        className="flex w-auto max-w-3xl cursor-pointer justify-between rounded-lg bg-base-100 shadow-lg transition-all hover:scale-105 hover:shadow-amber-400/40"
        onClick={onCardClick ?? null}
        tabIndex={0}
      >
        <img
          src={avatarUrl(profileImg, firstName + lastName + studentId)}
          alt="Profile picture of the tutor"
          className="h-36 w-24 flex-1 rounded-lg object-cover sm:w-48"
          loading="lazy"
        />
        <div className="inline-flex w-64 flex-col justify-start pt-4 pl-4 pb-4 sm:w-96">
          <h3 className="text-md my-2 w-40 max-w-fit overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-base-content transition-colors hover:cursor-pointer hover:text-primary-focus sm:w-64 sm:text-xl">
            {firstName} {lastName}
          </h3>
          <p className="cursor-default text-sm text-base-content text-opacity-80 selection:bg-primary sm:text-base">
            <FontAwesomeIcon size="sm" icon={faBookOpen} fixedWidth />{' '}
            {subjects.join(', ')}
          </p>
          <p className="cursor-default text-sm text-base-content text-opacity-80 selection:bg-primary sm:text-base">
            <FontAwesomeIcon size="sm" icon={faGraduationCap} fixedWidth />{' '}
            {levels.join(', ')}
          </p>
        </div>
        <div className="-ml-24 inline-flex select-none flex-col items-end justify-between p-2">
          {accepted && apptDate && (
            <div className="flex items-center">
              <div>
                <p className="sm:text-md text-center text-xs">
                  {moment(apptDate).format('MMM YYYY')}
                </p>
                <p className="text-center text-lg sm:text-xl">
                  {moment(apptDate).format('D')}
                </p>{' '}
                <p className="sm:text-md text-center text-xs">
                  {moment(apptDate).format('hh:mm')}
                </p>
              </div>
              <span className="mx-1">-</span>
              <div>
                <p className="sm:text-md text-center text-xs">
                  {moment(apptDate).format('MMM YYYY')}
                </p>
                <p className="text-center text-lg sm:text-xl">
                  {moment(apptDate).format('D')}
                </p>{' '}
                <p className="sm:text-md text-center text-xs">
                  {moment(apptDate).format('hh:mm')}
                </p>
              </div>
            </div>
          )}
          {createdDate && (
            <p className="w-28 text-right text-xs text-base-content/50">
              {moment(createdDate).fromNow()}
            </p>
          )}
          {!accepted && (
            <div>
              <button
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                onClick={onDecline}
              >
                <FontAwesomeIcon fixedWidth icon={faTimes} size="lg" />
              </button>
              <button
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-success"
                onClick={onAccept}
              >
                <FontAwesomeIcon fixedWidth icon={faCheck} size="lg" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
}

export default AppointmentCard;

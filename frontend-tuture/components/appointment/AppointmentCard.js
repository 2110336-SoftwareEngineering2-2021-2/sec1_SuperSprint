import {
  faBookOpen,
  faGraduationCap,
  faTimes,
  faCheck,
  faComment,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import avatarUrl from '../../lib/avatarUrl';
import moment from 'moment';
import Modal from 'react-modal';

function AppointmentCard({
  studentId,
  firstName,
  lastName,
  profileImg,
  subjects,
  levels,
  createdDate,
  startApptDate,
  endApptDate,
  status = 'pending',
  onCardClick,
  onAccept,
  onDecline,
  onCancel, //Peem added this
  onChatClick,
  POV = 'student',
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
    // <input type="checkbox" id="my-modal" className="modal-toggle" >
    <div>
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
        {/* <Modal isOpen={true}>
        <h2>Test modal</h2>
        <p>modal body</p>
      </Modal> */}
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

          {/* R and L Seperation */}

          <div className="-ml-24 inline-flex select-none flex-col items-end justify-between p-2">
            {(status == 'offering' || status == 'confirmed') &&
              startApptDate &&
              endApptDate && (
                <div className="flex items-center">
                  <div>
                    <p className="sm:text-md text-center text-xs">
                      {moment(startApptDate).format('MMM YYYY')}
                    </p>
                    <p className="text-center text-lg sm:text-xl">
                      {moment(startApptDate).format('D')}
                    </p>{' '}
                    <p className="sm:text-md text-center text-xs">
                      {moment(startApptDate).format('hh:mm')}
                    </p>
                  </div>
                  <span className="mx-1">-</span>
                  <div>
                    <p className="sm:text-md text-center text-xs">
                      {moment(endApptDate).format('MMM YYYY')}
                    </p>
                    <p className="text-center text-lg sm:text-xl">
                      {moment(endApptDate).format('D')}
                    </p>{' '}
                    <p className="sm:text-md text-center text-xs">
                      {moment(endApptDate).format('hh:mm')}
                    </p>
                  </div>
                </div>
              )}
            {createdDate && (
              <p className="w-28 text-right text-xs text-base-content/50">
                {moment(createdDate).fromNow()}
              </p>
            )}
            {(status === 'confirmed' ||
              (status === 'offering' && POV === 'tutor')) && (
              <div>
                <button
                  className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-yellow-500"
                  onClick={onChatClick}
                >
                  <FontAwesomeIcon fixedWidth icon={faComment} size="lg" />
                </button>
                {status !== 'confirmed' && (
                  <label
                    className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                    onClick={onCancel}
                    for="cancelModal"
                  >
                    <div className="pt-1.5">
                      <FontAwesomeIcon fixedWidth icon={faBan} size="lg" />
                    </div>
                  </label>
                )}
              </div>
            )}
            {status === 'offering' && POV === 'student' && (
              <div>
                <button
                  className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-yellow-500"
                  onClick={onChatClick}
                >
                  <FontAwesomeIcon fixedWidth icon={faComment} size="lg" />
                </button>
                <label
                  className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                  onClick={onDecline}
                  for="declineModal"
                >
                  <div className="pt-1.5">
                    <FontAwesomeIcon fixedWidth icon={faTimes} size="lg" />
                  </div>
                </label>
                <label
                  className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-success"
                  onClick={onAccept}
                  for="acceptModal"
                >
                  <div className="pt-1.5">
                    <FontAwesomeIcon fixedWidth icon={faCheck} size="lg" />
                  </div>
                </label>
              </div>
            )}
            {status === 'pending' && POV === 'tutor' && (
              <div>
                <label
                  className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                  // onClick={onDecline}
                  for="declineModal"
                >
                  <div className="pt-1.5">
                    <FontAwesomeIcon fixedWidth icon={faTimes} size="lg" />
                  </div>
                </label>
                <label
                  className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-success"
                  // onClick={onAccept}
                  for="acceptModal"
                >
                  <div className="pt-1.5">
                    <FontAwesomeIcon fixedWidth icon={faCheck} size="lg" />
                  </div>
                </label>
              </div>
            )}
            {status === 'pending' && POV === 'student' && (
              <div>
                <label
                  className="modal-button btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                  // onClick={onCancel}
                  for="cancelModal"
                >
                  <div className="pt-1.5">
                    <FontAwesomeIcon fixedWidth icon={faBan} size="lg" />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* <input type="checkbox" id="cancelModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">   
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">{(status == "pending" && POV=="student" && "Are you sure you want to cancel this tutor?") || 
                            (status == "negotiating" && POV=="student" && "Are you sure you want to cancel this negotiation?") ||
                            (status == "confirmed" && POV=="student" && "Are you sure you want to cancel this appointment?") ||
                            (status == "negotiating" && POV=="tutor" && "Are you sure you want to cancel this negotiation?") ||
                            (status == "offering" && POV=="tutor" && "Are you sure you want to cancel this offering?")||
                            (status == "confirmed" && POV=="tutor" && "Are you sure you want to cancel this appointment?")}</p>
        <div className="modal-action">
              <label
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                for ="cancelModal"
              >
                <div className="pt-1.5">
                <FontAwesomeIcon fixedWidth icon={faTimes} size="xl" />
                </div>
              </label>
              <label
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-success"
                onClick={onCancel}
                for ="cancelModal"
              >
                <div className="pt-1.5">
                <FontAwesomeIcon fixedWidth icon={faCheck} size="xl" />
                </div>
              </label>
            </div>
          </div>
        </div>

        <input type="checkbox" id="acceptModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">   
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">{(POV == "student" && "Are you sure you want to accept this deal?") || (POV == "tutor" && "Are you sure you to accept this student?")}</p>
        <div className="modal-action">
              <label
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                for ="acceptModal"
              >
                <div className="pt-1.5">
                <FontAwesomeIcon fixedWidth icon={faTimes} size="xl" />
                </div>
              </label>
              <label
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-success"
                onClick={onAccept}
                for ="acceptModal"
              >
                <div className="pt-1.5">
                <FontAwesomeIcon fixedWidth icon={faCheck} size="xl" />
                </div>
              </label>
            </div>
          </div>
        </div>

        <input type="checkbox" id="declineModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">   
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">{(POV == "student" && "Are you sure you want to decline this deal?") || (POV == "tutor" && "Are you sure you to decline this student?")}</p>
        <div className="modal-action">
              <label
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-error"
                for ="declineModal"
              >
                <div className="pt-1.5">
                <FontAwesomeIcon fixedWidth icon={faTimes} size="xl" />
                </div>
              </label>
              <label
                className="btn btn-ghost btn-circle btn-sm inline-block rounded-full text-success"
                onClick={onDecline}
                for ="declineModal"
              >
                <div className="pt-1.5">
                <FontAwesomeIcon fixedWidth icon={faCheck} size="xl" />
                </div>
              </label>
            </div>
          </div>
        </div> */}
      </Transition>
    </div>
  );
}

export default AppointmentCard;

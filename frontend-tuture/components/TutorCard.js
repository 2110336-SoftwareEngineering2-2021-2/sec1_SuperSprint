import {
  faBookOpen,
  faGraduationCap,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

export default function TutorCard({
  name,
  profileImg,
  subjects,
  levels,
  rating,
  price,
  onCardClick,
  onChooseClick,
}) {
  const [showCard, setShowCard] = useState(false);

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
        className="flex w-auto max-w-3xl justify-between rounded-lg bg-base-100 shadow-lg transition-all hover:scale-105 hover:shadow-amber-400/40"
        onClick={onCardClick ?? null}
        tabIndex={0}
      >
        <img
          src={profileImg}
          alt="Profile picture of the tutor"
          className="h-36 w-24 flex-1 rounded-lg object-cover sm:w-48"
          loading="lazy"
        />
        <div className="inline-flex w-64 flex-col justify-between p-4 sm:w-96">
          <h3 className="text-md w-40 max-w-fit overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-base-content transition-colors hover:cursor-pointer hover:text-primary-focus xs:w-52 sm:w-80 sm:text-xl">
            {name}
          </h3>
          <p className="cursor-default text-sm text-base-content text-opacity-80 selection:bg-primary sm:text-base">
            <FontAwesomeIcon size="sm" icon={faBookOpen} fixedWidth />{' '}
            {subjects.join(', ')}
          </p>
          <p className="cursor-default text-sm text-base-content text-opacity-80 selection:bg-primary sm:text-base">
            <FontAwesomeIcon size="sm" icon={faGraduationCap} fixedWidth />{' '}
            {levels.join(', ')}
          </p>
          <p className="cursor-default text-sm text-base-content text-opacity-80 selection:bg-primary sm:text-base">
            <FontAwesomeIcon size="sm" icon={faDollarSign} fixedWidth />{' '}
            {`${price.min} - ${price.max} baht/hr`}
          </p>
        </div>
        <div className="inline-flex select-none flex-col justify-between p-2">
          <div>
            <p className="text-center text-3xl font-bold text-primary sm:text-4xl">
              {rating.toFixed(1)}
            </p>
            <p className="sm:text-md text-center text-sm text-secondary">
              rating
            </p>
          </div>
          <button
            className="btn btn-primary btn-sm rounded-full"
            onClick={onChoose}
          >
            Choose
          </button>
        </div>
      </div>
    </Transition>
  );
}

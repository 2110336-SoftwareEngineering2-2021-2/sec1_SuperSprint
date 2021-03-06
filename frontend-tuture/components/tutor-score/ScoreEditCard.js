import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import avatarUrl from '../../lib/avatarUrl';
import { useForm } from 'react-hook-form';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import ScoreImageUpload from './ScoreImageUpload';

const indicatorBadgeClass = {
  approved: 'badge-success',
  pending: 'badge-info',
  rejected: 'badge-error ',
  empty: 'badge-accent',
  default: 'badge-primary',
};

export default function ScoreEditCard({
  scoreData,
  hookFormRegister,
  hookFormSetValue,
  hookFormControl,
  hookFormError,
  onDeleteClick,
}) {
  const [showCard, setShowCard] = useState(false);
  // console.log(tutorId);

  useEffect(() => {
    setShowCard(true);
  }, []);

  function onDelete(event) {
    event.preventDefault();
    if (typeof onDeleteClick == 'function') {
      onDeleteClick();
    }
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
        className="flex w-auto max-w-3xl flex-col justify-between rounded-lg bg-base-100 shadow-lg transition-all hover:shadow-amber-400/40 sm:flex-row"
        tabIndex={0}
      >
        <div className="inline-flex w-full flex-col justify-between p-4 sm:w-full">
          <div className="flex items-center gap-2">
            <h3 className="w-40 max-w-fit overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold text-base-content transition-colors hover:cursor-pointer hover:text-primary-focus xs:w-52 sm:w-80 sm:text-xl">
              {scoreData.subjectName} ({scoreData.level})
            </h3>
            <div
              className={`badge indicator-item ${
                indicatorBadgeClass[scoreData.status || 'default']
              }`}
            >
              {scoreData.status}
            </div>
          </div>
          <div className="divider"></div>
          <div>
            <label className="input-group input-group-sm mb-2">
              <span className="w-20">Score</span>
              <input
                className="input input-bordered input-primary input-sm w-24 xs:w-32"
                {...hookFormRegister(`${scoreData.subjectId}.currentScore`, {
                  onBlur: (event) => {
                    hookFormSetValue(
                      `${scoreData.subjectId}.currentScore`,
                      Math.round(parseFloat(event.target.value) * 10000) / 10000
                    );
                  },
                })}
                type="number"
                placeholder="0"
              />
              <span>/ {scoreData.maxScore}</span>
            </label>
            {hookFormError[scoreData.subjectId]?.currentScore && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {hookFormError[scoreData.subjectId].currentScore.message}
                </span>
              </label>
            )}
            <label className="input-group input-group-sm">
              <span className="w-20">Year</span>
              <input
                className="input input-bordered input-primary input-sm w-24 xs:w-32"
                {...hookFormRegister(`${scoreData.subjectId}.year`)}
                id="score"
                type="text"
                placeholder="0"
                disabled
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 p-2 sm:flex-row">
          <ScoreImageUpload
            subjectId={scoreData.subjectId}
            hookFormControl={hookFormControl}
            defaultValue={scoreData.scoreImage}
          />
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faRedo} fixedWidth />
          </button>
        </div>
      </div>
    </Transition>
  );
}

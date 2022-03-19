import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import avatarUrl from '../../lib/avatarUrl';
import { useForm } from 'react-hook-form';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ScoreImageUpload from './ScoreImageUpload';

export default function ScoreEditCard({
  scoreData,
  hookFormRegister,
  hookFormControl,
  onDeleteClick,
}) {
  const [showCard, setShowCard] = useState(false);
  // console.log(tutorId);

  useEffect(() => {
    setShowCard(true);
  }, []);

  function onDelete(event) {
    event.preventDefault();
    if (typeof onChooseClick == 'function') {
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
        <div className="inline-flex w-64 flex-col justify-between pt-4 pl-4 pb-4 sm:w-96">
          <h3 className="text-md w-40 max-w-fit overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-base-content transition-colors hover:cursor-pointer hover:text-primary-focus xs:w-52 sm:w-80 sm:text-xl">
            {scoreData.subject} ({scoreData.level})
          </h3>
          <div className="divider"></div>
          <div>
            <label className="input-group mb-2">
              <span className="w-20">Score</span>
              <input
                className="input input-bordered input-primary input-sm w-32"
                {...hookFormRegister(`${scoreData.subjectId}.score`)}
                id="score"
                type="number"
                placeholder="0"
                max={scoreData.maxScore}
              />
              <span className="w-20">/ {scoreData.maxScore}</span>
            </label>
            <label className="input-group">
              <span className="w-20">Year</span>
              <select
                className="input input-bordered input-primary input-sm w-32"
                {...hookFormRegister(`${scoreData.subjectId}.year`)}
                id="score"
                type="text"
                placeholder="0"
                defaultValue=""
              >
                <option value="" disabled></option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <ScoreImageUpload
            subjectId={scoreData.subjectId}
            hookFormControl={hookFormControl}
            defaultValue={'https://api.lorem.space/image/shoes?w=320&h=320'}
          />
        </div>
        <button
          className="btn-fit btn border-none bg-transparent hover:cursor-pointer hover:border-none hover:bg-transparent hover:text-primary-focus"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrash} fixedWidth />
        </button>
      </div>
    </Transition>
  );
}

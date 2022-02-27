import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

export function SubjectForm({
  subjects,
  hookFormRegister,
  hookFormErrors,
  hookFormWatch,
  idx,
  onButtonClick,
  lastElement,
  reactMax,
}) {
  const subject = hookFormWatch(`subjects.${idx}.subject`);

  return (
    <div className={`${lastElement ? '' : 'mb-4'}`}>
      <div className={`flex w-fit flex-wrap items-center gap-2`}>
        <div className="flex w-fit flex-row items-center gap-1 xs:gap-2">
          <select
            {...hookFormRegister(`subjects.${idx}.subject`)}
            className="select-bordered select-primary select select-sm w-32 max-w-xs sm:w-48 md:select-md"
          >
            <option value="" disabled>
              Select subject
            </option>
            {Object.keys(subjects).map((e, idx) => (
              <option key={idx} value={e}>
                {e}
              </option>
            ))}
          </select>
          <span>/</span>
          <select
            {...hookFormRegister(`subjects.${idx}.level`)}
            className="select-bordered select-primary select select-sm w-32 max-w-xs sm:w-48 md:select-md "
            disabled={subject === ''}
          >
            <option value="" disabled>
              Select level
            </option>
            {subject !== '' &&
              subjects[subject]?.map((e, idx) => (
                <option key={idx} value={e.id}>
                  {e.level}
                </option>
              ))}
          </select>
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

      {hookFormErrors?.subjects && (
        <div className="mt-2">
          {hookFormErrors?.subjects[idx]?.message && (
            <p className="label-text-alt text-error">
              {hookFormErrors.subjects[idx].message}
            </p>
          )}
          {hookFormErrors?.subjects[idx] &&
            hookFormErrors?.subjects[idx]?.subject && (
              <p className="label-text-alt text-error">
                {hookFormErrors.subjects[idx].subject.message}
              </p>
            )}
          {hookFormErrors?.subjects[idx] &&
            hookFormErrors?.subjects[idx]?.level && (
              <p className="label-text-alt text-error">
                {hookFormErrors.subjects[idx].level.message}
              </p>
            )}
        </div>
      )}
    </div>
  );
}

const defaultState = { subject: '', level: '' };

function SubjectListForm({
  hookFormRegister,
  hookFormControl,
  hookFormErrors,
  hookFormWatch,
  subjects,
  maxSubject,
}) {
  const { fields, append, remove, replace } = useFieldArray({
    control: hookFormControl,
    name: 'subjects',
  });

  function addField(value) {
    append(value);
  }

  function removeField(idx) {
    remove(idx);
  }

  return (
    <div>
      {fields.map((field, idx) => (
        <SubjectForm
          key={field.id}
          subjects={subjects}
          hookFormRegister={hookFormRegister}
          hookFormErrors={hookFormErrors}
          hookFormWatch={hookFormWatch}
          idx={idx}
          lastElement={idx === fields.length - 1}
          reactMax={fields.length === maxSubject}
          onButtonClick={
            idx === fields.length - 1 ? () => addField({...defaultState}) : () => removeField(idx)
          }
        />
      ))}
    </div>
  );
}

export default SubjectListForm;

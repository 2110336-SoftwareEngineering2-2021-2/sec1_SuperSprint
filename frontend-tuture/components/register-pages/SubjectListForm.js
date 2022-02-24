import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

export function SubjectForm({
  subjects,
  hookFormRegister,
  hookFormErrors,
  idx,
  onButtonClick,
  lastElement,
  reactMax,
}) {
  const [subject, setSubject] = useState('');

  return (
    <div className={`${lastElement ? '' : 'mb-4'}`}>
      <div className={`flex w-fit flex-wrap items-center gap-2`}>
        <div className="flex w-fit flex-row items-center gap-1 xs:gap-2">
          <select
            {...hookFormRegister(`subjects.${idx}.subject`)}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="select-bordered select-primary select select-sm w-36 max-w-xs sm:w-48 md:select-md"
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
            className="select-bordered select-primary select select-sm w-36 max-w-xs sm:w-48 md:select-md "
            disabled={subject === ''}
          >
            <option value="" disabled>
              Select level
            </option>
            {subject !== '' &&
              subjects[subject].map((e, idx) => (
                <option key={idx} value={e}>
                  {e}
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

      {hookFormErrors.subjects && hookFormErrors.subjects[idx] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {hookFormErrors.subjects[idx].message}
          </span>
        </label>
      )}
    </div>
  );
}

const defaultState = { subject: '', level: '' };

function SubjectListForm({
  hookFormRegister,
  hookFormControl,
  hookFormErrors,
  subjects,
  maxSubject,
}) {
  const { fields, append, remove } = useFieldArray({
    control: hookFormControl,
    name: 'subjects',
  });

  function addField() {
    append({ ...defaultState });
  }

  useEffect(() => {
    addField();
  }, []);

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
          idx={idx}
          lastElement={idx === fields.length - 1}
          reactMax={fields.length === maxSubject}
          onButtonClick={
            idx === fields.length - 1 ? addField : () => removeField(idx)
          }
        />
      ))}
    </div>
  );
}

export default SubjectListForm;

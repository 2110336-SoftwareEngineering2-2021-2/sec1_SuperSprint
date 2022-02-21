import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function SubjectForm({
  subjects,
  hookFormRegister,
  idx,
  fieldVal,
  onChange,
  onButtonClick,
  lastElement,
  reactMax,
}) {
  return (
    <div
      className={`flex w-fit flex-wrap items-center gap-2 ${
        lastElement ? '' : 'mb-4'
      }`}
    >
      <div className="flex w-fit items-center gap-1 flex-row xs:gap-2">
        <select
          {...hookFormRegister(`subjects.${idx}.subject`)}
          value={fieldVal.subject}
          onChange={(event) => onChange('subject', event.target.value)}
          defaultValue=""
          className="select-bordered select-primary select select-sm max-w-xs sm:w-48 w-36 md:select-md"
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
          value={fieldVal.level}
          onChange={(event) => onChange('level', event.target.value)}
          defaultValue=""
          className="select-bordered select-primary select select-sm max-w-xs sm:w-48 w-36 md:select-md "
          disabled={fieldVal.subject === ''}
        >
          <option value="" disabled>
            Select level
          </option>
          {fieldVal.subject !== '' &&
            subjects[fieldVal.subject].map((e, idx) => (
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
  );
}

const defaultState = { subject: '', level: '' };

function SubjectListForm({ hookFormRegister, subjects, maxSubject }) {
  const [subjectFormVals, setSubjectFormVals] = useState([{...defaultState}]);

  function addField() {
    setSubjectFormVals([...subjectFormVals, {...defaultState}]);
  }
  
  function removeField(idx) {
    let newFormVals = [...subjectFormVals];
    newFormVals.splice(idx, 1);
    setSubjectFormVals(newFormVals);
  }
  
  function handleFieldChange(idx, item, value) {
    console.log(idx, item, value);
    let newFormVals = [...subjectFormVals];
    newFormVals[idx][item] = value;
    console.log(newFormVals[idx][item]);
    console.log(newFormVals);
    setSubjectFormVals(newFormVals);
  }

  return (
    <div>
      {subjectFormVals.map((item, idx) => (
        <SubjectForm
          key={idx}
          subjects={subjects}
          hookFormRegister={hookFormRegister}
          idx={idx}
          fieldVal={item}
          lastElement={idx === subjectFormVals.length - 1}
          reactMax={subjectFormVals.length === maxSubject}
          onButtonClick={
            idx === subjectFormVals.length - 1
              ? addField
              : () => removeField(idx)
          }
          onChange={(item, value) => handleFieldChange(idx, item, value)}
        />
      ))}
    </div>
  );
}

export default SubjectListForm;

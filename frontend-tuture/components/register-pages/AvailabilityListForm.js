import { useState } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import { Controller } from 'react-hook-form';

function AvailabilityForm({
  hookFormControl,
  idx,
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
        <Controller
          control={hookFormControl}
          name={`availability.${idx}.from`}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              value={value}
              format="y-MM-dd hh:mm a"
              onChange={(val) => {
                onChange(val);
                onFieldChange(0, val);
              }}
              strictParsing={true}
              className="input-bordered input-primary input input-sm w-[15.7rem] md:input-md md:w-[16.7rem]"
            />
          )}
        />
        <span>-</span>
        <Controller
          control={hookFormControl}
          name={`availability.${idx}.to`}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              value={value}
              format="y-MM-dd hh:mm a"
              onChange={(val) => {
                onChange(val);
                onFieldChange(1, val);
              }}
              strictParsing={true}
              className="input-bordered input-primary input input-sm w-[15.7rem] md:input-md md:w-[16.7rem]"
            />
          )}
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

const defaultState = [null, null];

function AvailabilityListForm({
  hookFormControl,
  hookFormSetValue,
  maxAvailability,
}) {
  const [availFormVals, setAvailFormVals] = useState([[...defaultState]]);

  function applyFieldChanges(newFormVals) {
    console.log(newFormVals);
    newFormVals.forEach((e, idx) => {
      hookFormSetValue(`availability.${idx}.from`, e[0]);
      hookFormSetValue(`availability.${idx}.to`, e[1]);
    });
  }

  function addAvailField() {
    const newFormVals = [...availFormVals, [null, null]];
    applyFieldChanges(newFormVals);
    setAvailFormVals(newFormVals);
  }

  function removeAvailField(idx) {
    let newFormVals = [...availFormVals];
    newFormVals.splice(idx, 1);
    applyFieldChanges(newFormVals);
    setAvailFormVals(newFormVals);
  }

  function handleAvailFieldChange(idx, id, value) {
    const newFormVals = [...availFormVals];
    newFormVals[idx][id] = value;
    setAvailFormVals(newFormVals);
  }

  return (
    <div className="my-2">
      {availFormVals.map((item, idx) => (
        <AvailabilityForm
          key={idx}
          hookFormControl={hookFormControl}
          idx={idx}
          formVal={item}
          lastElement={idx === availFormVals.length - 1}
          reactMax={availFormVals.length === maxAvailability}
          onButtonClick={
            idx === availFormVals.length - 1
              ? addAvailField
              : () => removeAvailField(idx)
          }
          onFieldChange={(id, value) => handleAvailFieldChange(idx, id, value)}
        />
      ))}
    </div>
  );
}

export default AvailabilityListForm;

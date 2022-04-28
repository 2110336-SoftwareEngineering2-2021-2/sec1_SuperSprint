import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import { Controller, useFieldArray } from 'react-hook-form';

function AvailabilityForm({
  hookFormControl,
  hookFormErrors,
  idx,
  lastElement,
  onButtonClick,
  reactMax,
}) {
  return (
    <div className={`${lastElement ? '' : 'mb-4'}`}>
      <div
        className={`flex w-fit flex-wrap items-center gap-2`}
      >
        <div className="flex w-fit flex-col items-center gap-0 sm:flex-row sm:gap-2">
          <Controller
            control={hookFormControl}
            name={`availability.${idx}.from`}
            render={({ field: { onChange, value, ref } }) => (
              <DateTimePicker
                value={value}
                ref={ref}
                minDate={new Date()}
                format="y-MM-dd hh:mm a"
                onChange={onChange}
                strictParsing={true}
                className="input input-bordered input-primary input-sm w-[15.7rem] md:input-md md:w-[16.7rem]"
              />
            )}
          />
          <span>-</span>
          <Controller
            control={hookFormControl}
            name={`availability.${idx}.to`}
            render={({ field: { onChange, value, ref } }) => (
              <DateTimePicker
                value={value}
                ref={ref}
                minDate={new Date()}
                format="y-MM-dd hh:mm a"
                onChange={onChange}
                strictParsing={true}
                className="input input-bordered input-primary input-sm w-[15.7rem] md:input-md md:w-[16.7rem]"
              />
            )}
          />
        </div>

        <button
          type="button"
          className="btn btn-outline btn-primary btn-xs inline-block w-fit grow-0 rounded-full text-center xs:btn-sm"
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

      {hookFormErrors?.availability && hookFormErrors?.availability[idx]?.from && (
        <label className="label">
          <span className="label-text-alt text-error">
            {hookFormErrors?.availability[idx]?.from.message}
          </span>
        </label>
      )}
      {hookFormErrors?.availability && hookFormErrors?.availability[idx]?.to && (
        <label className="label">
          <span className="label-text-alt text-error">
            {hookFormErrors?.availability[idx]?.to.message}
          </span>
        </label>
      )}
    </div>
  );
}

const defaultState = { from: null, to: null };

function AvailabilityListForm({
  hookFormControl,
  hookFormErrors,
  maxAvailability,
}) {
  const { fields, append, remove, replace } = useFieldArray({
    control: hookFormControl,
    name: 'availability',
  });

  function addField() {
    append({ ...defaultState });
  }

  function removeField(idx) {
    remove(idx);
  }

  return (
    <div className="my-2">
      {fields.map((field, idx) => (
        <AvailabilityForm
          key={field.id}
          hookFormControl={hookFormControl}
          hookFormErrors={hookFormErrors}
          hookFormField={field}
          idx={idx}
          lastElement={idx === fields.length - 1}
          reactMax={fields.length === maxAvailability}
          onButtonClick={
            idx === fields.length - 1 ? addField : () => removeField(idx)
          }
        />
      ))}
    </div>
  );
}

export default AvailabilityListForm;

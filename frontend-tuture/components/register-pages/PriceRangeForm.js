import { Range } from 'rc-slider';
import { useState, useEffect } from 'react';
import { MAX_PRICE, MIN_PRICE } from './Constants';
import { Controller } from 'react-hook-form';

function PriceRangeForm({
  hookFormControl,
  hookFormRegister,
  hookFormWatch,
  hookFormSetValue,
}) {
  function validatePriceRange() {
    let newPriceRange = [
      ...[hookFormWatch('price.min'), hookFormWatch('price.max')],
    ];
    newPriceRange[0] = Math.min(
      newPriceRange[1],
      Math.max(newPriceRange[0], MIN_PRICE)
    );
    newPriceRange[1] = Math.max(
      newPriceRange[0],
      Math.min(newPriceRange[1], MAX_PRICE)
    );
    hookFormSetValue('price', { min: newPriceRange[0], max: newPriceRange[1] });
  }

  return (
    <Controller
      control={hookFormControl}
      name="price"
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <div className="m-auto my-4 w-11/12">
            <Range
              id="price_range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={50}
              value={[value.min, value.max]}
              allowCross={false}
              onChange={(val) => onChange({ min: val[0], max: val[1] })}
              trackStyle={[{ backgroundColor: '#ffc400' }]}
              handleStyle={[
                { borderColor: '#ffc400' },
                { borderColor: '#ffc400' },
              ]}
            />
          </div>
          <div className="my-2 flex w-full items-center justify-between">
            <label
              className="input-group-xs input-group w-5/12 sm:w-3/12"
              htmlFor="price_min"
            >
              <input
                id="price_min"
                value={value.min}
                onChange={(e) =>
                  onChange({ min: e.target.value, max: value.max })
                }
                onBlur={() => {
                  onBlur();
                  validatePriceRange();
                }}
                type="number"
                className="min-w-2/3 sm:min-w-1/2 input-bordered input-primary input input-sm w-full"
                min={MIN_PRICE}
                max={MAX_PRICE}
              />
              <span>THB</span>
            </label>
            <span className="select-none">-</span>
            <label
              className="input-group-xs input-group right-0 w-5/12 sm:w-3/12"
              htmlFor="price_max"
            >
              <input
                id="price_max"
                value={value.max}
                onChange={(e) =>
                  onChange({ min: value.min, max: e.target.value })
                }
                onBlur={() => {
                  onBlur();
                  validatePriceRange();
                }}
                type="number"
                className="min-w-2/3 sm:min-w-1/2 input-bordered input-primary input input-sm w-full"
                min={MIN_PRICE}
                max={MAX_PRICE}
              />
              <span>THB</span>
            </label>
          </div>
        </>
      )}
    />
  );
}

export default PriceRangeForm;

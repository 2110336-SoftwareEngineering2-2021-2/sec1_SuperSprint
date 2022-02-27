import { Range } from 'rc-slider';
import { useState } from 'react';
import { MAX_PRICE, MIN_PRICE } from './Constants';

const defaultState = [2000, 4500];

function PriceRangeForm({ hookFormRegister, defaultValue = [...defaultState] }) {
  const [priceRange, setPriceRange] = useState([...defaultValue]);

  function setMinPriceRange(event) {
    let newPriceRange = [...priceRange];
    newPriceRange[0] = event.target.value;
    setPriceRange(newPriceRange);
  }

  function setMaxPriceRange(event) {
    let newPriceRange = [...priceRange];
    newPriceRange[1] = event.target.value;
    setPriceRange(newPriceRange);
  }

  function validatePriceRange() {
    let newPriceRange = [...priceRange];
    newPriceRange[0] = Math.min(
      newPriceRange[1],
      Math.max(newPriceRange[0], MIN_PRICE)
    );
    newPriceRange[1] = Math.max(
      newPriceRange[0],
      Math.min(newPriceRange[1], MAX_PRICE)
    );
    setPriceRange(newPriceRange);
  }
  
  return (
    <>
      <div className="m-auto my-4 w-11/12">
        <Range
          id="price_range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={50}
          value={priceRange}
          allowCross={false}
          onChange={(val) => setPriceRange(val)}
          trackStyle={[{ backgroundColor: '#ffc400' }]}
          handleStyle={[{ borderColor: '#ffc400' }, { borderColor: '#ffc400' }]}
        />
      </div>
      <div className="my-2 flex w-full items-center justify-between">
        <label
          className="input-group-xs input-group w-5/12 sm:w-3/12"
          htmlFor="price_min"
        >
          <input
            id="price_min"
            {...hookFormRegister('price.min')}
            type="number"
            value={priceRange[0]}
            className="min-w-2/3 sm:min-w-1/2 input-bordered input-primary input input-sm w-full"
            onChange={(event) => setMinPriceRange(event)}
            onBlur={validatePriceRange}
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
            {...hookFormRegister('price.max')}
            type="number"
            value={priceRange[1]}
            className="min-w-2/3 sm:min-w-1/2 input-bordered input-primary input input-sm w-full"
            onChange={(event) => setMaxPriceRange(event)}
            onBlur={validatePriceRange}
            min={MIN_PRICE}
            max={MAX_PRICE}
          />
          <span>THB</span>
        </label>
      </div>
    </>
  );
}

export default PriceRangeForm;

import { useReducer, useState } from "react";
import Slider from "rc-slider";
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "rc-slider/assets/index.css";

const { Range } = Slider;
const subjects = ["Mathmetic", "Physic", "Biology", "English"];
const levels = ["Middle School", "High School"];

const minPrice = 0;
const maxPrice = 10000;

function AvailabilityForm({
  formVal,
  lastElement,
  onButtonClick,
  onFieldChange,
  reactMax,
}) {
  return (
    <div className="m-auto flex w-full items-center sm:m-auto sm:block">
      <div className="grid grid-cols-11 items-center justify-center gap-2 sm:inline-flex sm:flex-nowrap">
        <input
          type="date"
          id="avail_date"
          min={new Date().toISOString().split("T")[0]}
          value={formVal.avail_date || ""}
          onChange={(e) => onFieldChange(e)}
          className="input input-primary input-bordered input-sm col-span-11 inline-block"
        />
        <input
          type="time"
          id="avail_time_from"
          value={formVal.avail_time_from || ""}
          onChange={(e) => onFieldChange(e)}
          className="input input-primary input-bordered input-sm col-span-5 inline-block sm:w-32"
        />
        <span className="col-span-1 text-center w-4">-</span>
        <input
          type="time"
          id="avail_time_to"
          value={formVal.avail_time_to || ""}
          onChange={(e) => onFieldChange(e)}
          className="input input-primary input-bordered input-sm col-span-5 inline-block sm:w-32"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary xs:btn-sm btn-xs btn-outline mx-2 inline-block w-fit grow-0 rounded-full text-center"
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

function Matching() {
  const [priceRange, setPriceRange] = useState([2000, 4500]);
  const [availFormVals, setAvailFormVals] = useState([
    { avail_date: "", avail_time_from: "", avail_time_to: "" },
  ]);

  function test(e) {
    setPriceRange(e);
    console.log(priceRange);
  }

  function onSetPriceRange(event) {
    console.log(event.target.value);
  }

  function submitMatching(event) {
    event.preventDefault();
    console.log(event);
  }

  function addAvailField() {
    setAvailFormVals([
      ...availFormVals,
      { avail_date: "", avail_time_from: "", avail_time_to: "" },
    ]);
  }

  function removeAvailField(idx) {
    let newFormVals = [...availFormVals];
    newFormVals.splice(idx, 1);
    setAvailFormVals(newFormVals);
  }

  function handleAvailFieldChange(idx, event) {
    console.log(idx, event.target);
    let newFormVals = [...availFormVals];
    newFormVals[idx][event.target.id] = event.target.value;
    setAvailFormVals(newFormVals);
  }

  return (
    <Layout title="Matching">
      <div className="flex flex-col items-center">
        <h2 className="mb-6 text-2xl font-bold">Matching</h2>
        <form
          className="w-full max-w-2xl p-2"
          id="matching_form"
          onSubmit={submitMatching}
        >
          <div className="-mx-3 mb-2 flex flex-wrap">
            <div className="relative mb-2 w-full px-3 sm:mb-0 sm:w-1/2">
              <label className="label" for="study_subject">
                <span className="label-text">
                  Subject <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <div>
                <select
                  className="select select-bordered select-primary w-full"
                  id="study_subject"
                  required
                >
                  <option value="" disabled selected className="text-gray-400">
                    {" "}
                    Select your subject{" "}
                  </option>
                  {subjects.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
              </div>
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <label className="label" for="edu_level">
                <span className="label-text">
                  Education Level{" "}
                  <span className="label-text text-red-500">*</span>
                </span>
              </label>
              <div className="relative">
                <select
                  className="select select-bordered select-primary w-full"
                  id="edu_level"
                  required
                >
                  <option value="" disabled selected>
                    {" "}
                    Select your education level{" "}
                  </option>
                  {levels.map((e, idx) => (
                    <option key={idx}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="divider" />

          <div className="m-auto">
            <label for="price_range" className="label">
              <span className="label-text">Price Range</span>
            </label>
            <div className="m-auto mb-4 w-11/12">
              <Range
                id="price_range"
                min={minPrice}
                max={maxPrice}
                step={10}
                value={priceRange}
                allowCross={false}
                onChange={test}
                trackStyle={[{ backgroundColor: "#ffc400" }]}
                handleStyle={[
                  { borderColor: "#ffc400" },
                  { borderColor: "#ffc400" },
                ]}
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <label
                className="input-group input-group-xs w-5/12 sm:w-1/5"
                for="price_min"
              >
                <input
                  id="price_min"
                  type="number"
                  value={priceRange[0]}
                  className="input input-primary input-bordered input-sm min-w-2/3 sm:min-w-1/2 w-full"
                  onChange={onSetPriceRange}
                  min={minPrice}
                  max={maxPrice}
                />
                <span>THB</span>
              </label>
              <span className="select-none">-</span>
              <label
                className="input-group input-group-xs right-0 w-5/12 sm:w-1/5"
                for="price-max"
              >
                <input
                  id="price-max"
                  type="number"
                  value={priceRange[1]}
                  className="input input-primary input-bordered input-sm min-w-2/3 sm:min-w-1/2 w-full"
                  min={minPrice}
                  max={maxPrice}
                />
                <span>THB</span>
              </label>
            </div>
          </div>

          <div className="divider" />

          <div className="m-auto w-full">
            <label className="label mb-4">
              <span className="label-text">Availability (max 10)</span>
            </label>
            <div className="m-auto w-fit px-2">
              {/* Slice for shallow copy and reverse, making original array unchanged */}
              {availFormVals
                .map((item, idx) => (
                  <AvailabilityForm
                    key={idx}
                    formVal={item}
                    lastElement={idx === availFormVals.length - 1}
                    reactMax={availFormVals.length === 10}
                    onButtonClick={
                      idx === availFormVals.length - 1
                        ? addAvailField
                        : () => removeAvailField(idx)
                    }
                    onFieldChange={(event) =>
                      handleAvailFieldChange(idx, event)
                    }
                  />
                ))
                .reverse()
                .reduce((prev, curr) => [
                  prev,
                  <div className="divider" />,
                  curr,
                ])}
            </div>
          </div>

          <div className="divider" />
          <div className="flex w-full justify-center">
            <input
              type="submit"
              className="btn btn-primary btn-sm rounded-full"
              value="Match"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Matching;

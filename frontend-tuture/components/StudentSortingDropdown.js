import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import react, { useEffect, useState } from "react";

const SORT_OPTION = [
  // {
  //   title: "Credibility Score",
  //   key: "credit",
  // },
  {
    title: "Rating",
    key: "rating",
  },
  {
    title: "Price Range",
    key: "price",
  },
  {
    title: "Tutor Name",
    key: "name",
  },
];

function StudentSortingDropdown({ className, sortingCallback }) {
  const [selectedSortMode, setSelectedSortMode] = useState(SORT_OPTION[0]);
  const [isAsc, setAsc] = useState(true);

  useEffect(() => {
    try {
      sortingCallback({ sortMode: selectedSortMode.key, asc: isAsc });
    } catch (error) {
      console.error(error.msg);
    }
  }, [selectedSortMode, isAsc]);

  function changeSortMode(event) {
    const selected = event.target.getAttribute("note");
    setSelectedSortMode(SORT_OPTION.find((item) => item.key === selected));
  }

  function toggleArrow() {
    setAsc(!isAsc);
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="dropdown">
        <div>
          <label className="w-full sm:text-base text-sm">Sorted by: </label>
          <button tabIndex="0" className="btn btn-primary btn-outline m-1 sm:w-44 w-36 sm:btn-md btn-sm">
            <span className="sm:text-base text-sm">{selectedSortMode.title}</span>
          </button>
        </div>
        <ul
          tabIndex="0"
          className="menu dropdown-content bg-base-100 rounded-box ml-20 w-52 p-2 shadow"
        >
          {SORT_OPTION.map((item, idx) => (
            <li key={idx}>
              <a onClick={changeSortMode} note={item.key}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="btn btn-primary sm:btn-md btn-sm" onClick={toggleArrow}>
          <FontAwesomeIcon
            size="sm"
            icon={isAsc ? faArrowDown : faArrowUp}
            fixedWidth
          />
        </button>
      </div>
    </div>
  );
}

export default StudentSortingDropdown;

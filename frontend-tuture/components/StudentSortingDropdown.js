import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const SORT_OPTION = [
  {
    title: 'Rating',
    key: 'rating',
  },
  {
    title: 'Credibility',
    key: 'credit',
  },
  {
    title: 'Price Range',
    key: 'price',
  },
  {
    title: 'Tutor Name',
    key: 'name',
  },
];

function StudentSortingDropdown({ className, sortingCallback }) {
  const [selectedSortMode, setSelectedSortMode] = useState(SORT_OPTION[0]);
  const [isAsc, setAsc] = useState(false);

  useEffect(() => {
    try {
      sortingCallback({ sortMode: selectedSortMode.key, asc: isAsc });
    } catch (error) {
      console.error(error.msg);
    }
  }, [selectedSortMode, isAsc]); //change do function

  function changeSortMode(event) {
    const selected = event.target.getAttribute('note');
    setSelectedSortMode(SORT_OPTION.find((item) => item.key === selected));
  }

  function toggleArrow() {
    setAsc(!isAsc);
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="dropdown">
        <div>
          <label className="w-full text-sm sm:text-base">Sorted by: </label>
          <button
            tabIndex="0"
            className="btn-outline btn btn-primary btn-sm m-1 w-36 sm:btn-md sm:w-44"
          >
            <span className="text-sm sm:text-base">
              {selectedSortMode.title}
            </span>
          </button>
        </div>
        <ul
          tabIndex="0"
          className="dropdown-content menu rounded-box ml-20 w-52 bg-base-100 p-2 shadow"
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
        <button
          className="btn btn-primary btn-sm sm:btn-md"
          onClick={toggleArrow}
        >
          <FontAwesomeIcon
            size="sm"
            icon={isAsc ? faArrowUp : faArrowDown}
            fixedWidth
          />
        </button>
      </div>
    </div>
  );
}

export default StudentSortingDropdown;

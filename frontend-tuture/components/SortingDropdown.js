import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import react, { useState } from "react";

function SortingDropdown() {
  const [selectedSortMode, setSelectedSortMode] = useState("Credibility Score");
  const [selectedMode, setSelectedMode] = useState("Ascending");

  function changeSortMode(event) {
    switch (event.target.getAttribute("note")) {
      case "Credibility Score":
        setSelectedSortMode("Credibility Score");
        //more function here!
        break;

      case "Review Score":
        setSelectedSortMode("Review Score");
        //more function here!
        break;

      case "Price Range":
        setSelectedSortMode("Price Range");
        //more function here!
        break;

      case "Tutor Name":
        setSelectedSortMode("Tutor Name");
        //more function here!
        break;

      default:
        setSelectedSortMode("AMONG US");
        break;
    }
    // console.log(event.target.getAttribute("note"))
  }

  function toggleArrow(){
    if (selectedMode==='Ascending'){
        setSelectedMode('Descending')
        //more function here!
    } 
    else{
        setSelectedMode('Ascending')
        //more function here!
    } 
  }

  return (
    <div className="flex items-center">
      <div class="dropdown">
        <div>
          <label className="w-full">Sorted by: </label>
          <button tabindex="0" class="btn btn-primary btn-outline m-1 w-44">
            {selectedSortMode}
          </button>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content bg-base-100 rounded-box ml-20 w-52 p-2 shadow"
        >
          <li>
            <a onClick={changeSortMode} note="Credibility Score">
              Credibility Score
            </a>
          </li>
          <li>
            <a onClick={changeSortMode} note="Review Score">
              Review Score
            </a>
          </li>
          <li>
            <a onClick={changeSortMode} note="Price Range">
              Price Range
            </a>
          </li>
          <li>
            <a onClick={changeSortMode} note="Tutor Name">
              Tutor Name
            </a>
          </li>
        </ul>
      </div>
      <div>
        <button class="btn btn-primary" onClick={toggleArrow}>
          <FontAwesomeIcon
            size="sm"
            icon={selectedMode === "Ascending" ? faArrowUp : faArrowDown}
            
            fixedWidth
          />
        </button>
      </div>
    </div>
  );
}

export default SortingDropdown;

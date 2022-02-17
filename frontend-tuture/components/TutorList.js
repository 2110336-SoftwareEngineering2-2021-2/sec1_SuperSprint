import { useState } from 'react';
import TutorCard from './TutorCard';
import StudentSortingDropdown from './StudentSortingDropdown';

const SORT_OPTION = [
  {
    sortMode: 'rating',
    func: (a, b) => a.rating - b.rating,
  },
  {
    sortMode: 'credit',
    func: (a, b) => a.credit - b.credit,
  },
  {
    sortMode: 'price',
    func: (a, b) => {
      if (a.price.min !== b.price.min) return a.price.min - b.price.min;
      return a.price.max - b.price.max;
    },
  },
  {
    sortMode: 'name',
    func: (a, b) => {
      const a_name = a.name.split(' ');
      const b_name = b.name.split(' ');

      if (a_name[0] !== b_name[0]) return a_name[0] < b_name[0] ? -1 : 1;
      if (a_name[1] !== b_name[1]) return a_name[1] < b_name[1] ? -1 : 1;
      return 0;
    },
  },
];

function TutorList({
  tutors,
  sortOption = true,
  cardClickHandler,
  chooseTutorHandler,
}) {
  const [sortedOption, setSortedOption] = useState({
    option: SORT_OPTION[0],
    asc: false,
  });

  function onChangeSorting(option) {
    const sortingOption = SORT_OPTION.find(
      (item) => item.sortMode === option.sortMode
    );
    setSortedOption({ option: sortingOption, asc: option.asc });
  }

  function cardClickHandling(tutorId) {
    if (typeof cardClickHandler === 'function') {
      cardClickHandler(tutorId);
    }
  }

  function tutorsHandling(tutors) {
    if (sortOption)
      return tutors
        .sort(sortedOption.option.func)
        [sortedOption.asc ? 'slice' : 'reverse']();
    return tutors;
  }

  return (
    <>
      {sortOption && (
        <StudentSortingDropdown
          sortingCallback={onChangeSorting}
          className="ml-auto mr-2 w-fit"
        />
      )}
      <div className="my-2 flex flex-wrap justify-center gap-4">
        {tutors.length > 0 ? (
          tutorsHandling(tutors).map((item, idx) => (
            <TutorCard
              key={idx}
              first_name={item.first_name}
              last_name={item.last_name}
              profileImg={item.profileImg}
              subjects={item.subjects}
              levels={item.levels}
              rating={item.rating}
              price={item.price}
              onCardClick={() => cardClickHandling(item.tutor_id)}
              onChooseClick={() => chooseTutorHandler(item.tutor_id)}
            />
          ))
        ) : (
          <p className="text-lg">{'No result :('}</p>
        )}
      </div>
    </>
  );
}

export default TutorList;

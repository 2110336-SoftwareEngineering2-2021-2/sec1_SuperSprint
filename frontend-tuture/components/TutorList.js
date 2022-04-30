import { useState } from 'react';
import TutorCard from './TutorCard';
import StudentSortingDropdown from './StudentSortingDropdown';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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
      if (a.firstName !== b.firstName)
        return a.firstName < b.firstName ? -1 : 1;
      if (a.lastName !== b.lastName) return a.lastName < b.lastName ? -1 : 1;
      return 0;
    },
  },
];

async function chooseTutor(session, tutorId) {
  try {
    const res = await fetch(`${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/chat/request`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tutorId: tutorId,
        studentId: session.user._id,
      }),
    });
    if (!res.ok) {
      throw new Error('Fetch error');
    }
    return true;
  } catch (error) {
    console.log(error.stack);
    return false;
  }
}

function TutorList({
  tutors,
  sortOption = true,
  cardClickHandler,
  chooseTutorHandler = chooseTutor,
}) {
  const { data: session } = useSession();
  const [sortedOption, setSortedOption] = useState({
    option: SORT_OPTION[0],
    asc: false,
  });
  const router = useRouter();

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
              key={item.tutorId}
              tutorId={item.tutorId}
              firstName={item.firstName}
              lastName={item.lastName}
              profileImg={item.profileImg}
              subjects={item.subjects}
              levels={item.levels}
              rating={item.rating}
              price={item.price}
              onCardClick={() => router.push(`/tutor/${item.tutorId}`)}
              onChooseClick={() => {
                const ok = chooseTutorHandler(session, item.tutorId);
                if (ok) router.push('/chat');
              }}
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

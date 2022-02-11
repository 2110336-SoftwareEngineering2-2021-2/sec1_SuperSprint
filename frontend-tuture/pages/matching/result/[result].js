import { useState } from "react";
import Layout from "../../../components/Layout";
import StudentSortingDropdown from "../../../components/StudentSortingDropdown";
import TutorCard from "../../../components/TutorCard";

const SORT_OPTION = [
  // {
  //   key: "credit",
  //   func: (a,b) => a.credit - b.credit
  // },
  {
    sortMode: "rating",
    func: (a, b) => a.rating - b.rating,
  },
  {
    sortMode: "price",
    func: (a, b) => {
      if (a.price.min !== b.price.min) return a.price.min - b.price.min;
      return a.price.max - b.price.max;
    },
  },
  {
    sortMode: "name",
    func: (a, b) => {
      const a_name = a.name.split(" ");
      const b_name = b.name.split(" ");

      if (a_name[0] !== b_name[0]) return a_name[0] < b_name[0] ? -1 : 1;
      if (a_name[1] !== b_name[1]) return a_name[1] < b_name[1] ? -1 : 1;
      return 0;
    },
  },
];

function MatchingResult({ tutors }) {
  const [sortedOption, setSortedOption] = useState({
    option: SORT_OPTION[0],
    asc: true,
  });

  function onChangeSorting(option) {
    const sortingOption = SORT_OPTION.find(
      (item) => item.sortMode === option.sortMode
    );
    setSortedOption({ option: sortingOption, asc: option.asc });
  }

  return (
    <Layout>
      <StudentSortingDropdown
        sortingCallback={onChangeSorting}
        className="ml-auto mr-0 w-fit"
      />
      <div className="my-2 flex flex-wrap justify-center gap-4">
        {tutors.sort(sortedOption.option.func)[sortedOption.asc ? 'slice' : 'reverse']().map((item, idx) => (
          <TutorCard
            key={idx}
            name={item.name}
            profileImg={item.profileImg}
            subjects={item.subjects}
            levels={item.levels}
            rating={item.rating}
            price={item.price}
            onCardClick={() => console.log(`Card click ${item.name}`)}
            onChooseClick={() =>
              console.log(`Choose button click ${item.name}`)
            }
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const { result } = context.query;
  // const queryResult = JSON.parse(result);
  // console.log(queryResult);

  const tutors = new Array(10);
  for (var i = 0; i < 10; i++)
    tutors[i] = {
      name:
        Math.random().toString(36).slice(2) +
        " " +
        Math.random().toString(36).slice(2),
      profileImg:
        "https://www.chicagotribune.com/resizer/a-16fPYl-SK8W6HPnzjOHK1rqho=/800x551/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IEYVMAFZ7BBXHM46GFNLWRN3ZA.jpg",
      subjects: ["Physics", "Chemistry"],
      levels: ["High school", "Middle school"],
      rating: Math.random() * 5,
      price: {
        min: 100 + Math.floor(Math.random() * 1000),
        max: 2000 + Math.floor(Math.random() * 1000),
      },
    };
  // console.log(query);

  return {
    props: { tutors },
  };
}

export default MatchingResult;

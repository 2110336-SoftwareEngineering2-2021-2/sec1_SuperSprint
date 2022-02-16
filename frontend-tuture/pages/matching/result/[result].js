import { useState } from "react";
import Layout from "../../../components/Layout";
import StudentSortingDropdown from "../../../components/StudentSortingDropdown";
import TutorCard from "../../../components/TutorCard";

const SORT_OPTION = [
  {
    sortMode: "rating",
    func: (a, b) => a.rating - b.rating,
  },
  {
    sortMode: "credit",
    func: (a, b) => a.credit - b.credit,
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
    asc: false,
  });

  function onChangeSorting(option) {
    const sortingOption = SORT_OPTION.find(
      (item) => item.sortMode === option.sortMode
    );
    setSortedOption({ option: sortingOption, asc: option.asc });
  }

  async function cardClickHandling(tutorId) {
    try {
      const test = await fetch(`/api/test/${tutorId}`);
      console.log(test);
      alert("yay");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout title="Matching | Tuture">
      <StudentSortingDropdown
        sortingCallback={onChangeSorting}
        className="ml-auto mr-2 w-fit"
      />
      <div className="my-2 flex flex-wrap justify-center gap-4">
        {tutors.length > 0 ? (
          tutors
            .sort(sortedOption.option.func)
            [sortedOption.asc ? "slice" : "reverse"]()
            .map((item, idx) => (
              <TutorCard
                key={idx}
                name={item.name}
                profileImg={item.profileImg}
                subjects={item.subjects}
                levels={item.levels}
                rating={item.rating}
                price={item.price}
                onCardClick={() => console.log(`Card click ${item.name}`)}
                onChooseClick={() => cardClickHandling(item.tutor_id)}
              />
            ))
        ) : (
          <p className="text-lg">{"No result :("}</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { result } = context.query;
  const json = JSON.parse(result);
  console.log(json);
  const body = JSON.stringify({
    subjectName: json.study_subject,
    level: json.levels,
    priceMin: json.price_min,
    priceMax: json.price_max,
    availabilityStudent: json.availability.map((e) => {
      return {
        availabilityDate: e.avail_date,
        availabilityTimeFrom: e.avail_time_from,
        availabilityTimeTo: e.avail_time_to,
      };
    }),
  });
  console.log(body);
  const res = await fetch(`http://${process.env.API_URL}/tutor/match`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  const data = await res.json();
  console.log(data);

  const tutors = data.tutorList.map((item) => {
    return {
      name: `${item.firstName} ${item.lastName}`,
      tutor_id: item._id,
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w",
      subjects: item.teachSubject.map((e) => e.title),
      levels: Array.from(new Set(item.teachSubject.map((e) => e.level))),
      rating: item.avgRating,
      price: { min: item.priceMin, max: item.priceMax },
      credit: item.score,
    };
  });

  // const tutors = new Array(10).fill(temp);

  return {
    props: { tutors },
  };
}

export default MatchingResult;

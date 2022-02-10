import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import TutorCard from "../../components/TutorCard";

function SearchResult({ tutors, query }) {
  return (
    <Layout>
      <h1 className="mx-auto mb-6 text-center text-2xl font-bold">
        Result: {query.s}
      </h1>
      <div className="divider" />
      <div className="my-2 flex flex-wrap justify-center gap-4">
        {tutors.map((item, idx) => (
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

const temp = {
  name: "Haha Mama",
  profileImg:
    "https://www.chicagotribune.com/resizer/a-16fPYl-SK8W6HPnzjOHK1rqho=/800x551/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IEYVMAFZ7BBXHM46GFNLWRN3ZA.jpg",
  subjects: ["Physics", "Chemistry"],
  levels: ["High school", "Middle school"],
  rating: Math.random() * 5,
  price: { min: 300, max: 500 },
};

export async function getServerSideProps(context) {
  const { query } = context;
  // const res = await fetch(``);
  // const data = await res.json();

  const tutors = new Array(10).fill(temp);
  console.log(query);

  return {
    props: { tutors, query },
  };
}

export default SearchResult;

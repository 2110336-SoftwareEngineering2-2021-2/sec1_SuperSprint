import Layout from '../../components/Layout';
import TutorCard from '../../components/TutorCard';

function SearchResult({ tutors, query }) {
  return (
    <Layout title={`${query.result} | Tuture`}>
      <h1 className="mx-auto mb-6 text-center text-2xl font-bold">
        Result: {query.result}
      </h1>
      <div className="divider" />
      <div className="my-2 flex flex-wrap justify-center gap-4">
        {tutors.length > 0 ? (
          tutors.map((item, idx) => (
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
          ))
        ) : (
          <p className="text-lg">{'No result :('}</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  console.log(`${process.env.API_URL}/tutor/search`);
  const res = await fetch(`http://${process.env.API_URL}/tutor/search`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: query.result,
    }),
  });
  const data = await res.json();
  console.log(data);

  const tutors = data.tutorList.map((item) => {
    return {
      name: `${item.firstName} ${item.lastName}`,
      profileImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w',
      subjects: item.teachSubject.map((e) => e.title),
      levels: Array.from(new Set(item.teachSubject.map((e) => e.level))),
      rating: item.avgRating,
      price: { min: item.priceMin, max: item.priceMax },
    };
  });

  // const tutors = new Array(10).fill(temp);

  return {
    props: { tutors, query },
  };
}

export default SearchResult;

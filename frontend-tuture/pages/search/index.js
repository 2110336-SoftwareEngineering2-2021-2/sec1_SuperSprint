import Layout from '../../components/Layout';
import TutorList from '../../components/TutorList';

function SearchResult({ tutors, query }) {
  return (
    <Layout title={`${query.result} | Tuture`}>
      <h1 className="mx-auto mb-6 text-center text-2xl font-bold">
        Result: {query.result}
      </h1>
      <TutorList tutors={tutors} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  try {
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

    const tutors = data.tutorList.map((item) => {
      return {
        first_name: item.firstName,
        last_name: item.lastName,
        tutor_id: item._id,
        profileImg:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w',
        subjects: item.teachSubject.map((e) => e.title),
        levels: Array.from(new Set(item.teachSubject.map((e) => e.level))),
        rating: item.avgRating,
        price: { min: item.priceMin, max: item.priceMax },
        // credit: item.score
      };
    });

    // const tutors = new Array(10).fill(temp);

    return {
      props: { tutors, query },
    };
  } catch (error) {
    return {
      props: { tutors: [], query },
    };
  }
}

export default SearchResult;

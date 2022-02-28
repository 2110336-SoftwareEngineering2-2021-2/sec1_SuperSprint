import Layout from '../../../components/Layout';
import TutorList from '../../../components/TutorList';

function MatchingResult({ tutors }) {
  async function cardClickHandling(tutorId) {
    try {
      const test = await fetch(`/api/test/${tutorId}`);
      console.log(test);
      alert('yay');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout title="Matching | Tuture">
      <TutorList
        tutors={tutors}
        cardClickHandler={async (tutorId) => await cardClickHandling(tutorId)}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const { result } = context.query;
    const json = JSON.parse(result);
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
    const res = await fetch(`http://${process.env.API_URL}/tutor/match`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
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
        credit: item.score,
      };
    });

    // const tutors = new Array(10).fill(temp);

    return {
      props: { tutors },
    };
  } catch (error) {
    return {
      props: { tutors: [] },
    };
  }
}

export default MatchingResult;

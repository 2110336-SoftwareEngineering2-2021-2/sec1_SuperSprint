import Layout from '../../../components/Layout';
import TutorList from '../../../components/TutorList';
import { getSession } from 'next-auth/react';

function MatchingResult({ tutors }) {
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
  const session = await getSession(context);

  try {
    const { result } = context.query;
    const json = JSON.parse(result);
    console.log('json here', json);
    const body = JSON.stringify({
      subjectName: json.study_subject,
      level: json.levels,
      priceMin: json.price_min,
      priceMax: json.price_max,
      availabilityStudent: json.availability,
    });
    
    // console.log(body);
    // console.log(session);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutor/match`,
      {
        method: 'POST',
        mode: 'cors',
        // credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: body,
      }
    );
    const data = await res.json();

    const tutors = data.tutorList.map((item) => {
      return {
        firstName: item.firstName,
        lastName: item.lastName,
        tutorId: item._id,
        profileImg: item.profileUrl,
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

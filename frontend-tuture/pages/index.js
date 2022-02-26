import Layout from '../components/Layout';
import TutorList from '../components/TutorList';

export default function Home({ tutors }) {

  return (
    <Layout title="Home | Tuture">
      {/* <h1 className="w-full text-4xl font-bold">Hello</h1>
      <Link href="/matching">
        <a className="block">Matching</a>
      </Link>
      <Link href="/testpage">
        <a className="block">Test page</a>
      </Link> */}
      <div className="px-8">
        <h1 className="mx-auto text-2xl font-bold">
          Hello, {'Phusaratis Jong'}
        </h1>
        <div className="divider" />
        {/* <h2>your recommendation</h2> */}
        <TutorList tutors={tutors} sortOption={false} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`http://${process.env.API_URL}/student/recommend`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: '62051ce13dd882be338c2d2b',
      }),
    });
    const data = await res.json();
    
    const tutors = data.tutorList.map((item, idx) => {
      return {
        first_name: item.firstName,
        last_name: item.lastName,
        tutor_id: item._id,
        profileImg: `https://api.lorem.space/image/face?w=150&h=150&hash=${Math.random()}`,
        subjects: item.teachSubject.map((e) => e.title),
        levels: Array.from(new Set(item.teachSubject.map((e) => e.level))),
        rating: item.avgRating,
        price: { min: item.priceMin, max: item.priceMax },
        credit: item.score,
      };
    });

    return {
      props: { tutors },
    };
  } catch (error) {
    return {
      props: { tutors: [] },
    };
  }
}

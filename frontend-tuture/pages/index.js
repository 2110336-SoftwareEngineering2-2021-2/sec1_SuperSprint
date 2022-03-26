import { getSession, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import TutorList from '../components/TutorList';

export default function Home({ tutors }) {
  const { data: session } = useSession();

  return (
    <Layout title="Home | Tuture">
      <div className="px-8">
        <h1 className="mx-auto text-2xl font-bold">
          Hello, {session?.user?.firstName} {session?.user?.lastName}
        </h1>
        <div className="divider" />
        {/* <h2>your recommendation</h2> */}
        {session.user.role === 'student' && (
          <TutorList tutors={tutors} sortOption={false} />
        )}
        {session.user.role === 'tutor' && (
          <div className="flex flex-wrap justify-center gap-4">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Your Appointment</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/student/recommend`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          studentId: session.user._id,
          // studentId: '62051ce13dd882be338c2d2b',
        }),
      }
    );
    const data = await res.json();

    const tutors = data.tutorList.map((item, idx) => {
      return {
        firstName: item.firstName,
        lastName: item.lastName,
        tutorId: item._id,
        profileImg: item.profileUrl,
        subjects: item.teachSubject.map((e) => e.title),
        levels: Array.from(new Set(item.teachSubject.map((e) => e.level))),
        rating: item.avgRating,
        price: {
          min: item.priceMin || null,
          max: item.priceMax || null,
        },
        credit: item.score,
      };
    });
    // console.log('done fetching');

    return {
      props: { tutors: tutors, session: session },
    };
  } catch (error) {
    return {
      props: { tutors: [], session: session },
    };
  }
}

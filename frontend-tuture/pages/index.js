import Layout from "../components/Layout";
import Recommend from "../components/Recommend";

export default function Home({ tutors }) {
  return (
    <Layout title="Home">
      {/* <h1 className="w-full text-4xl font-bold">Hello</h1>
      <Link href="/matching">
        <a className="block">Matching</a>
      </Link>
      <Link href="/testpage">
        <a className="block">Test page</a>
      </Link> */}
      <div className="px-8">
        <h1 className="mx-auto text-2xl font-bold">
          Hello, {"Phusaratis Jong"}
        </h1>
        <div className="divider" />
        {/* <h2>your recommendation</h2> */}
        <Recommend tutors={tutors} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log(`${process.env.API_URL}/student/recommend`);
  const res = await fetch(`http://${process.env.API_URL}/student/recommend`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId: "62051ce13dd882be338c2d2b",
    }),
  });
  const data = await res.json();

  const tutors = data.tutorList.map((item) => {
    return {
      name: `${item.firstName} ${item.lastName}`,
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTQeke6GCoBbq9Mni1fnPLP8CapwRFRgx29w",
      subjects: item.teachSubject.map((e) => e.title),
      levels: Array.from(new Set(item.teachSubject.map((e) => e.level))),
      rating: item.avgRating,
      price: { min: item.priceMin, max: item.priceMax },
    };
  });

  return {
    props: { tutors },
  };
}

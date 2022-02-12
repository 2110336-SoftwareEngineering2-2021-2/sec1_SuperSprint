import Link from "next/link";
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
    props: { tutors },
  };
}

import Link from "next/link";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <Layout title="Home">
      <h1 className="w-full text-4xl font-bold">Hello</h1>
      <Link href="/matching">
        <a className="block">Matching</a>
      </Link>
      <Link href="/testpage">
        <a className="block">Test page</a>
      </Link>
    </Layout>
  );
}

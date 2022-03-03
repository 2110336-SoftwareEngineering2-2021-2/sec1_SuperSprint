import Layout from '../components/Layout';
import Link from 'next/link';
import StudentImage from '../public/images/students-studying-physics-in-classroom-2140100-2140100.svg';
import Image from 'next/image';

function Landing() {
  return (
    <Layout title="Tuture">
      <div className="hero h-full">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={StudentImage}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Tuture promo image"
          />
          <div>
            <h1 className="text-5xl font-bold">Tuture</h1>
            <p className="py-6">
              Platform where who love to teach and study met.
            </p>
            <Link href="/register" passHref>
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Landing;

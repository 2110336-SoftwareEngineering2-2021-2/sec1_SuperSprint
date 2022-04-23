import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function AdminHome() {
  const { data: session } = useSession();

  return (
    <Layout title="Home | Tuture Admin">
      <div className="px-8">
        <h1 className="mx-auto text-2xl font-bold">
          Welcome back, {session?.user?.firstName} {session?.user?.lastName}
        </h1>
        <div className="divider" />

        <div className="flex flex-wrap justify-center gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Score</h2>
              <div className="card-actions justify-end">
                <Link href="/admin/score" passHref>
                  <a className="btn btn-primary">Go</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.user?.role === 'admin',
  },
  pages: {
    signIn: '/signin/admin',
  },
});

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => ['student', 'admin'].includes(token?.user?.role),
  },
  pages: {
    signIn: '/',
    error: '/error',
  },
});

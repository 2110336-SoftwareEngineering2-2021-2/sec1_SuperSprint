import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default nextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(
          `http://${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            // mode: 'cors',
            // credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          }
        );
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          // console.log(user);
          return user;
        }
        // console.log(user);
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.user = user.user
      }
      // console.log('token', token);
      return token;
    },
    async session({ session, token }) {
      // console.log(session);
      session.accessToken = token.accessToken;
      session.user = token.user;
      // console.log(session);
      return session;
    },
  },
});

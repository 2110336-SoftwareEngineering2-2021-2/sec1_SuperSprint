import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
            username: { label: "Username", type: "username", placeholder: "test" },
            password: {  label: "Password", type: "password" }
            },
            authorize(credentials,req) {

                // const res = await fetch(`http://${process.env.API_URL}/api/auth/login`,{
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: {'Content-Type':'application/json'}
                // });

                // const user = await res.json();


                // if (res.ok && user) {
                //     return user;
                // }

                // return null;


                if (credentials.username === "aof123" && credentials.password === "123456") {
                    return {
                        id:1,
                        name:"aof",
                    }
                }
                
                return null
            
        }})
    ],
    pages: {
        signIn: '/login'
    },

    callbacks: {
        jwt: ({token, user}) => {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: ({session,token}) => {
            if (token) {
                session.id = token.id;
            }

            return session;
        }
    },
    secret: "test",
    jwt: {
        secret: "test",
        encryption: true
    },
    callbacks: {
        redirect({ url, baseUrl   }) {
          if (url.startsWith(baseUrl)) return url
          // Allows relative callback URLs
          else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
          return baseUrl
        }
      }
    // secret: process.env.JWT_SECRET,
    // callbacks: {
    //     async jwt({ token, user, account }) {
    //       if (account && user) {
    //         return {
    //           ...token,
    //           accessToken: user.data.token,
    //           refreshToken: user.data.refreshToken,
    //         };
    //       }
    
    //       return token;
    //     },
    
    //     async session({ session, token }) {
    //       session.user.accessToken = token.accessToken;
    //       session.user.refreshToken = token.refreshToken;
    //       session.user.accessTokenExpires = token.accessTokenExpires;
    
    //       return session;
    //     },
    //   },



})
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import '../styles/DateTimePicker.css';
import '../styles/Calendar.css';
import '../styles/Clock.css';
import 'rc-slider/assets/index.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'next-themes';
import NavbarControl from '../components/NavbarControl';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <NavbarControl signedIn={false}>
          <NextNProgress color="#ffc400" options={{ parent: 'main' }} />
          <Component {...pageProps} />
        </NavbarControl>
      </SessionProvider>
    </ThemeProvider>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   const userRole = session.user.role;
//   const res = await fetch(
//     `http://${process.env.NEXT_PUBLIC_API_URL}/${userRole}/getById?id=${session.user._id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${session.accessToken}`,
//       },
//     }
//   );
//   if (!res.ok) {
//     throw new Error('Fetch error');
//   }
//   const data = await res.json();

//   return {
//     props: {
//       name: `${data.firstName} ${data.lastName}`,
//       imgUrl: data.profileUrl,
//     },
//   };
// }

export default MyApp;

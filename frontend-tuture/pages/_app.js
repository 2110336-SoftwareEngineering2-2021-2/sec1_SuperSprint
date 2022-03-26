import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import '../styles/DateTimePicker.css';
import '../styles/Calendar.css';
import '../styles/Clock.css';
import 'rc-slider/assets/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'next-themes';
import NavbarControl from '../components/NavbarControl';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import 'simplebar/dist/simplebar.min.css';

config.autoAddCss = false;

const Toaster = dynamic(() => import('../components/commons/ToastContainer'));

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <NavbarControl>
          <NextNProgress color="#ffab00" options={{ parent: 'main' }} />
          <Component {...pageProps} />
          <Toaster />
        </NavbarControl>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;

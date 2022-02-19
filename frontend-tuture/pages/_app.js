import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import '../styles/DateTimePicker.css'
import '../styles/Calendar.css'
import '../styles/Clock.css'
import 'rc-slider/assets/index.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'next-themes';
import NavbarControl from '../components/NavbarControl';
import NextNProgress from 'nextjs-progressbar';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <NavbarControl signedIn={false}>
        <NextNProgress color="#ffc400" options={{ parent: 'main' }} />
        <Component {...pageProps} />
      </NavbarControl>
    </ThemeProvider>
  );
}

export default MyApp;

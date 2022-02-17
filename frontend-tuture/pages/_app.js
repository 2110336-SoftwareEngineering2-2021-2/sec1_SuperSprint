import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'next-themes';
import NavbarControl from '../components/NavbarControl';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <NavbarControl signedIn={false}>
        <Component {...pageProps} />
      </NavbarControl>
    </ThemeProvider>
  );
}

export default MyApp;

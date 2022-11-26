import type { AppProps } from 'next/app';
// import '../assets/libraries/prism-line-numbers.css';
import '../styles/globals.css';
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

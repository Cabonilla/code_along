import Head from 'next/head';
import MainInput from '../components/MainInput/index';
import homeStyling from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={homeStyling.container}>
      <Head>
        <title>CodeAlong</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainInput/>
    </div>
  )
}

export default Home

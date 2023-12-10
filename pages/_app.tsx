// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head'; // Import Head from next/head
import 'semantic-ui-css/semantic.min.css';
import '../global.css';
import UserProvider from '@store/user';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        {/* Add the viewport meta tag here */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other head elements go here */}
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
};

export default MyApp;

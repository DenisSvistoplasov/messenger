import { store } from '@/store/store';
import '@/styles/globals.css';
import '@/styles/_vars.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../firebase';
import { AuthorizationInitializer } from '@/components/utils/AuthorizationInitializer';
import { AccessChecker } from '@/components/utils/AccessChecker';
import Head from 'next/head';

// import '@/utils/audioPlayer';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Messenger</title>
      </Head>
      <Provider store={store}>
        <AuthorizationInitializer>
          <AccessChecker>
            <Component {...pageProps} />
          </AccessChecker>
        </AuthorizationInitializer>
      </Provider>
    </>
  );
}

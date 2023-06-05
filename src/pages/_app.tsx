import { store } from '@/store/store';
import '@/styles/globals.css';
import '@/styles/_vars.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../firebase';
import { AuthorizationInitializer } from '@/components/utils/AuthorizationInitializer';
import { AccessChecker } from '@/components/utils/AccessChecker';

// import '@/utils/audioPlayer';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthorizationInitializer>
        <AccessChecker>
          <Component {...pageProps} />
        </AccessChecker>
      </AuthorizationInitializer>
    </Provider>
  );
}

import { AppProps } from 'next/app';

import { GlobalStyle } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';
import GlobalProvider from '@/context/GlobalContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <GlobalStyle />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </GlobalProvider>
    </>
  );
}

export default App;

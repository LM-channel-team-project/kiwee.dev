import { AppProps } from 'next/app';

import AppLayout from '@/components/AppLayout';
import GlobalStyle from '@/lib/styles/globalStyle';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}

export default App;

import { useContext } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';
import GlobalProvider, { GlobalContext } from '@/context/GlobalContext';

function App({ Component, pageProps }: AppProps) {
  const [mode] = useContext(GlobalContext);
  console.log(mode);
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

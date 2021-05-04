import { AppProps } from 'next/app';

import { GlobalStyle } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';
import ThemeProvider from '@/context/ThemeContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}

export default App;

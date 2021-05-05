import { AppProps } from 'next/app';

import { GlobalStyle } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';

import ModalProvider from '@/context/ModalContext';
import ThemeProvider from '@/context/ThemeContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <ModalProvider>
          <GlobalStyle />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

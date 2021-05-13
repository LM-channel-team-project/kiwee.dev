import { AppProps } from 'next/app';

import { GlobalStyle } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';

import ModalProvider from '@/context/ModalContext';
import ThemeProvider from '@/context/ThemeContext';
import NewTabProvider from '@/context/NewTabContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <NewTabProvider>
          <ModalProvider>
            <GlobalStyle />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ModalProvider>
        </NewTabProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

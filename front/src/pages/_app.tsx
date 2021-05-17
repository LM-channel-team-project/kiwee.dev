import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import { GlobalStyle } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';

import ModalProvider from '@/context/ModalContext';
import ThemeProvider from '@/context/ThemeContext';
import NewTabProvider from '@/context/NewTabContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
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
    </Provider>
  );
}

export default App;

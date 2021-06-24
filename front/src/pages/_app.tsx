import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import { GlobalStyle } from '@/lib/styles';
import Favicon from '@/components/Favicon';
import AppLayout from '@/components/AppLayout';
import Modal from '@/components/Modal';

import ModalProvider from '@/context/ModalContext';
import ThemeProvider from '@/context/ThemeContext';
import NewTabProvider from '@/context/NewTabContext';
import MutationObserverProvider from '@/context/MutationObserverContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Favicon />
      <Provider session={pageProps.session}>
        <ThemeProvider>
          <MutationObserverProvider>
            <NewTabProvider>
              <ModalProvider>
                <GlobalStyle />
                <AppLayout>
                  <Component {...pageProps} />
                  <Modal />
                </AppLayout>
              </ModalProvider>
            </NewTabProvider>
          </MutationObserverProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';
import ModalProvider from '@/context/ModalContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme['light']}>
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

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '@/lib/styles';
import AppLayout from '@/components/AppLayout';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme['light']}>
        <GlobalStyle />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}

export default App;

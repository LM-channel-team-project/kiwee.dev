import React, { useState, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/lib/styles';

type ModeType = 'light' | 'dark';
type ContextType = [ModeType, () => void];
interface ChildrenType {
  children: React.ReactNode;
}

export const GlobalContext = createContext<ContextType>({} as ContextType);

function GlobalProvider({ children }: ChildrenType) {
  let initialState: ModeType = 'dark';
  if (typeof window !== 'undefined') {
    initialState = (window.localStorage.getItem('MODE') as ModeType) || 'dark';
  }

  const [mode, setMode] = useState<ModeType>(initialState);
  const toggleMode = () => {
    const changedMode = mode === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('MODE', changedMode);
    setMode(changedMode);
  };

  return (
    <GlobalContext.Provider value={[mode, toggleMode]}>
      <ThemeProvider theme={theme[mode]}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

import React, { useState, createContext } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { theme } from '@/lib/styles';

type ModeType = 'light' | 'dark';
type ContextType = [ModeType, () => void];
interface ChildrenType {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ContextType>({} as ContextType);

function ThemeProvider({ children }: ChildrenType) {
  let initialState: ModeType = 'light';
  if (typeof window !== 'undefined') {
    initialState = (window?.localStorage?.getItem('MODE') as ModeType) || 'light';
  }

  const [mode, setMode] = useState<ModeType>(initialState);
  const toggleMode = () => {
    const changedMode = mode === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('MODE', changedMode);
    setMode(changedMode);
  };

  return (
    <ThemeContext.Provider value={[mode, toggleMode]}>
      <StyledProvider theme={theme[mode]}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

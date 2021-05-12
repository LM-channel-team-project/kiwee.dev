import React, { useState, createContext, useEffect, useContext } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { theme } from '@/lib/styles';
import NewTabProvider, { NewTabContext } from './NewTabContext';
import { useNewTabContext } from '@/hooks/useNewTabContext';

type ModeType = 'light' | 'dark';
type ContextType = [ModeType, () => void];
interface ChildrenType {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ContextType>({} as ContextType);

function ThemeProvider({ children }: ChildrenType) {
  const [mode, setMode] = useState<ModeType>('light');
  const [isNewTab, toggleNewTab] = useContext(NewTabContext);
  console.log(isNewTab);

  useEffect(() => {
    if (window !== undefined) {
      const initialMode = window?.localStorage?.getItem('MODE') as ModeType | null;
      setMode(initialMode || 'light');
    }
  }, []);

  const toggleMode = () => {
    const changedMode = mode === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('MODE', changedMode);
    setMode(changedMode);
  };

  return (
    <ThemeContext.Provider value={[mode, toggleMode]}>
      <NewTabContext.Provider value={[isNewTab, toggleNewTab]}>
        <StyledProvider theme={theme[mode]}>{children}</StyledProvider>
      </NewTabContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

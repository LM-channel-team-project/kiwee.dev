import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export function useThemeContext() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('Cannot find ThemeContext');
  return value;
}

import { NewTabContext } from '@/context/NewTabContext';
import { useContext } from 'react';

export function useNewTabContext() {
  const value = useContext(NewTabContext);
  if (!value) throw new Error('Cannot find NewTabContext');
  return value;
}

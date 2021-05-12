import React, { createContext, useEffect, useState } from 'react';

type ContextType = [boolean, () => void];
interface ChildrenType {
  children: React.ReactNode;
}

export const NewTabContext = createContext<ContextType>({} as ContextType);

function NewTabProvider({ children }: ChildrenType) {
  const [isNewTab, setIsNewTab] = useState(false);

  useEffect(() => {
    const initialState = window?.localStorage?.getItem('NEWTAB') as boolean | null;
    setIsNewTab(initialState || false);
  }, []);

  const toggleNewTab = () => {
    const changedState = isNewTab === true ? false : true;
    window.localStorage.setItem('NEWTAB', `${changedState}`);
    setIsNewTab(changedState);
  };

  return (
    <NewTabContext.Provider value={[isNewTab, toggleNewTab]}>{children}</NewTabContext.Provider>
  );
}

export default NewTabProvider;

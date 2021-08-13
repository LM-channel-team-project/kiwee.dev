import React, { createContext, useEffect, useState } from 'react';

type ContextType = [boolean, () => void];
type InitialStateType = 'true' | 'false' | boolean | null;
interface ChildrenType {
  children: React.ReactNode;
}

export const NewTabContext = createContext<ContextType>({} as ContextType);

function NewTabProvider({ children }: ChildrenType) {
  const [isNewTab, setIsNewTab] = useState(false);

  useEffect(() => {
    // LocalStorage에는 boolean이 string형태로 저장되므로 getItem을 할 시에 boolean으로 바꿔준다.
    let initialState = window?.localStorage?.getItem('NEWTAB') as InitialStateType;
    initialState = initialState === 'false' ? false : true;

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

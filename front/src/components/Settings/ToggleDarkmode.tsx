import { GlobalContext } from '@/context/GlobalContext';
import React, { useContext } from 'react';

function ToggleDarkmode() {
  const [, setMode] = useContext(GlobalContext);

  return <button onClick={setMode}>다크모드</button>;
}

export default ToggleDarkmode;

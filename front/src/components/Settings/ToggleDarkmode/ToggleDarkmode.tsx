import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { SwitchButton, SwitchOnOff } from '@/components/Settings/common/styles';
import { Container } from './styles';

function ToggleDarkmode() {
  const [mode, setMode] = useContext(GlobalContext);

  return (
    <>
      <Container>
        <SwitchButton>
          <input type="checkbox" checked={mode === 'dark'} onChange={setMode} />
          <SwitchOnOff></SwitchOnOff>
        </SwitchButton>
        <span>다크모드</span>
      </Container>
    </>
  );
}

export default ToggleDarkmode;

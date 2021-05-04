import { SwitchButton, SwitchOnOff } from '@/components/Settings/common/styles';
import { Container } from './styles';
import { useThemeContext } from '@/hooks/useThemeContext';

function ToggleDarkmode() {
  const [mode, setMode] = useThemeContext();

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

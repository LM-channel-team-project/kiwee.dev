import { useNewTabContext } from '@/hooks/useNewTabContext';
import React from 'react';
import { SwitchButton, SwitchOnOff } from '../common/styles';
import { Container } from '../ToggleDarkmode/styles';

function ToggleNewTab() {
  const [isNewTab, setIsNewTab] = useNewTabContext();

  return (
    <Container>
      <SwitchButton>
        <input type="checkbox" checked={isNewTab === true} onChange={setIsNewTab} />
        <SwitchOnOff></SwitchOnOff>
      </SwitchButton>
      <span>새로운 탭에서 열기</span>
    </Container>
  );
}

export default ToggleNewTab;

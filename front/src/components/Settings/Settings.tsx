import React from 'react';
import { Container, Title, Division, Switches } from './styles';
import ToggleDarkmode from './ToggleDarkmode/ToggleDarkmode';
import ToggleNewTab from './ToggleNewTab';

function Settings() {
  return (
    <Container>
      <Title>설정</Title>
      <Division />
      <Switches>
        <ToggleDarkmode />
        <ToggleNewTab />
      </Switches>
    </Container>
  );
}

export default Settings;

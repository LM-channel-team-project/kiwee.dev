import React from 'react';
import { Container, Title, Division } from './styles';
import ToggleDarkmode from './ToggleDarkmode/ToggleDarkmode';
import ToggleNewTab from './ToggleNewTab';

function Settings() {
  return (
    <Container>
      <Title>설정</Title>
      <Division />
      <ToggleDarkmode />
      <ToggleNewTab />
    </Container>
  );
}

export default Settings;

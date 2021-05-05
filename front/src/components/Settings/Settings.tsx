import React from 'react';
import { Container, Title, Division } from './styles';
import ToggleDarkmode from './ToggleDarkmode/ToggleDarkmode';

function Settings() {
  return (
    <Container>
      <Title>설정</Title>
      <Division />
      <ToggleDarkmode />
    </Container>
  );
}

export default Settings;

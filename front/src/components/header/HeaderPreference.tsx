import { MouseEventHandler } from 'react';

interface PropTypes {
  onClickSetting: MouseEventHandler<HTMLButtonElement>;
}

function HeaderPreference({ onClickSetting }: PropTypes) {
  return <button onClick={onClickSetting}>설정</button>;
}

export default HeaderPreference;

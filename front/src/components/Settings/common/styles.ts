import styled from 'styled-components';

export const SwitchButton = styled.label`
  position: relative;
  display: inline-block;
  width: 55px;
  height: 30px;
  margin-right: 1.2rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span {
    background: #4263eb;
    box-shadow: inset 1px 5px 1px #364fc7;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX;
  }
`;

export const SwitchOnOff = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  background-color: #ccc;
  box-shadow: inset 1px 5px 1px #999;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.5s;
    transition: 0.4s;
    border-radius: 20px;
  }
`;

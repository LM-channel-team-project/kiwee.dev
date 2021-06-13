import styled, { keyframes, css } from 'styled-components';
import IconButton from '@/components/Common/Button/Icon';
import { IconButtonProps } from '@/components/Common/Button/Icon/IconButton';

interface Modal {
  disappear: boolean;
}

export const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;
export const ModalBackground = styled.div<Modal>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme['modal-bg']};

  animation-duration: 0.15s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

export const ModalBlock = styled.div<Modal>`
  position: relative;
  width: 400px;
  height: 360px;
  padding: 2rem;
  background: ${({ theme }) => theme[`background`]};
  border: ${({ theme }) => theme[`modal-border`]};
  box-shadow: ${({ theme }) => theme[`modal-shadow`]};
  border-radius: 10px;

  animation-duration: 0.15s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

export const CloseButton = styled(IconButton)<IconButtonProps>`
  position: absolute;
  right: 1.5rem;
`;

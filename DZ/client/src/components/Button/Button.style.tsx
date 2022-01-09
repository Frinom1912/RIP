import { Colors } from 'constants/colors';

import styled from 'styled-components';

import { ButtonProps } from './Button.types';

export const Button = styled.button<ButtonProps>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || 'transparent'};

  padding: ${({ round }) => (round ? '5px 5px' : '10px 16px')};
  border: 1px solid ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border-radius: 16px;
  cursor: pointer;

  color: ${Colors.TEXT_MAIN_COLOR};
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    border-color: ${({ backgroundColor, backgroundHoverColor }) =>
      backgroundHoverColor
        ? backgroundHoverColor
        : backgroundColor || 'transparent'};
    background-color: ${({ backgroundColor, backgroundHoverColor }) =>
      backgroundHoverColor
        ? backgroundHoverColor
        : backgroundColor || 'transparent'};
  }
`;

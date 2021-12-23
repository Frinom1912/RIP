import { Colors } from 'constants/colors';

import styled from 'styled-components';

import { TextProps } from './Text.types';

export const Text = styled.p<TextProps>`
  color: ${Colors.TEXT_MAIN_COLOR};
  font-family: Roboto;
  font-size: 14px;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};

  margin: 0;
`;

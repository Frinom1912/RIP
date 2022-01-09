import { Colors } from 'constants/colors';

import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  position: relative;
  height: auto;
  width: 100%;
  border: 1px solid ${Colors.BORDER_MAIN};
  border-radius: 16px;
  margin: 5px;
  padding: 20px;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  background-color: ${Colors.CARD_MAIN};
`;

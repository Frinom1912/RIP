import { Colors } from 'constants/colors';

import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex: 1 0 21%;
  position: relative;
  height: 250px;
  border: 1px solid ${Colors.BORDER_MAIN};
  border-radius: 16px;
  margin: 5px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.CARD_MAIN};
`;

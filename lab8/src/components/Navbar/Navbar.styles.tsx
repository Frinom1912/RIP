import { Colors } from 'constants/colors';

import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border: 1px solid ${Colors.BORDER_MAIN};
  height: 50px;
  background-color: ${Colors.BODY_MAIN};
`;

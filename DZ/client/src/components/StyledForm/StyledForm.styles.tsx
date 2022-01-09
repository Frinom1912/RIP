import { Colors } from 'constants/colors';

import styled from 'styled-components';

export const StyledForm = styled.form`
  border-radius: 16px;
  width: 500px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${Colors.BORDER_MAIN};
  background-color: ${Colors.BODY_MAIN};
  justify-content: space-between;
  height: 250px;
`;

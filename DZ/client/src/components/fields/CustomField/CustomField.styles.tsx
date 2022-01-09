import styled from 'styled-components';

export const CustomInput = styled.input`
  background: transparent;
  border: 1px solid #c8c8c8;
  padding: 8px 16px;
  border-radius: 16px;
  color: white;
  height: 20px;

  &::placeholder {
    color: #bfbfbf;
  }

  &:hover {
    background: #43484b;
  }

  &:focus {
    background: #4e5457;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 10px;
  color: red;
  margin: 0;
  margin-top: 4px;
`;

import styled from "styled-components";

export const Button = styled.button`
  background-color: #76b5c5;
  border-style: none;
  border-radius: 0.3rem;
  padding: 1.5rem;

  &:hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
  }
`;

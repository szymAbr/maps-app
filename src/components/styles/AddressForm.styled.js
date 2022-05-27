import styled from "styled-components";

export const Form = styled.form`
  min-width: 60vw;
  margin: 1.5rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    margin: 2.5rem;
  }
`;

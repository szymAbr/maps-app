import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    margin: 2rem;
  }

  & input {
    margin: 0.5rem 0;
  }
`;

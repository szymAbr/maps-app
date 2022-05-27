import styled from "styled-components";

export const FlexForm = styled.div`
  @media (min-width: 700px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  & div {
    margin: 2rem;
  }

  & textarea {
    margin: 1rem 0;
    min-width: 50vw;
    min-height: 5vh;
    max-width: 100vw;
    max-height: 20vh;
    box-sizing: border-box;
  }

  @media (min-width: 700px) {
    & textarea {
      min-width: 20vw;
      max-width: 30vw;
    }
  }
`;

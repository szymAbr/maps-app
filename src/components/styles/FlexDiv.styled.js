import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & ul {
    margin-top: 1rem;
    padding: 0;
    list-style: none;
  }

  & ul li {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  & ul li span {
    padding: 0.5rem 2rem;
    max-width: 40%;
  }

  & ul li span:nth-child(2) {
    text-align: right;
  }
`;

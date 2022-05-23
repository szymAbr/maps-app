import styled from "styled-components";

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    text-align: center;
  }

  & ul div {
    padding: 0 2.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & ul {
    margin-top: 1rem;
    margin-bottom: 3rem;
    padding: 0;
    list-style: none;
  }

  & ul li {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }

  & ul li span {
    padding: 0.5rem 2rem;
    max-width: 40%;
  }

  & ul li span:nth-child(2) {
    text-align: right;
  }

  & button,
  & input {
    margin-top: 1.5rem;
  }
`;

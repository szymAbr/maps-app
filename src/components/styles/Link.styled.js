import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  &:link {
    text-decoration: none;
  }

  &:visited {
    color: inherit;
  }

  nav &:hover {
    text-decoration: underline;
  }

  & h1 {
    width: 10rem;
  }
`;

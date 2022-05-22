import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavLink = styled(Link)`
  text-decoration: none;
  color: white;

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

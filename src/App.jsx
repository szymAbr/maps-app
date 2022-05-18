import "./App.css";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  border-bottom: solid 1px;
  padding-bottom: 1rem;
`;

export default function App() {
  return (
    <div>
      <h1>Map App</h1>

      <Nav>
        <Link to="/address">Address</Link> |{" "}
        <Link to="/map">Map</Link>
      </Nav>

      <Outlet />
    </div>
  );
}

import { Link, Outlet } from "react-router-dom";
import GlobalStyles from "./components/styles/Global";
import { Container } from "./components/styles/Container.styled";
import { Nav } from "./components/styles/Nav.styled";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <h1>Map App</h1>

        <Nav>
          <Link to="/address">Address</Link> | <Link to="/map">Map</Link>
        </Nav>

        <Outlet />
      </Container>
    </>
  );
}

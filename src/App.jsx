import { Outlet, useLocation } from "react-router-dom";
import GlobalStyles from "./components/styles/Global";
import { Container } from "./components/styles/Container.styled";
import { Nav } from "./components/styles/Nav.styled";
import { GlobalProvider } from "./context/GlobalState";
import { NavLink } from "./components/styles/NavLink.styled";
import { NavMain } from "./components/styles/NavMain.styled";
import { Heading } from "./components/styles/Heading.styled";
import SearchHistory from "./components/SearchHistory";

export default function App() {
  const location = useLocation();

  return (
    <GlobalProvider>
      <GlobalStyles />
      <Container>
        <NavMain>
          <Heading>Maps App</Heading>

          <Nav>
            <NavLink to="/">Home</NavLink> |{" "}
            <NavLink to="/address">Address</NavLink> |{" "}
            <NavLink to="/map">Map</NavLink>
          </Nav>
        </NavMain>

        {location.pathname === "/" ? <SearchHistory /> : null}

        <Outlet />
      </Container>
    </GlobalProvider>
  );
}

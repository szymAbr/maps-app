import { Outlet } from "react-router-dom";
import GlobalStyles from "./components/styles/Global";
import { Container } from "./components/styles/Container.styled";
import { Nav } from "./components/styles/Nav.styled";
import { GlobalProvider } from "./context/GlobalState";
import { StyledLink } from "./components/styles/Link.styled";
import { MainNav } from "./components/styles/MainNav.styled";

export default function App() {
  return (
    <GlobalProvider>
      <GlobalStyles />
      <Container>
        <MainNav>
          <StyledLink to="/">
            <h1>Map App</h1>
          </StyledLink>

          <Nav>
            <StyledLink to="/address">Address</StyledLink> |{" "}
            <StyledLink to="/map">Map</StyledLink>
          </Nav>
        </MainNav>

        <Outlet />
      </Container>
    </GlobalProvider>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Address from "./routes/address";
import Map from "./routes/map";
import styled from "styled-components";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Main = styled.main`
  padding: 1rem;
`;

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/maps-app" element={<App />}>
          <Route path="/maps-app/address" element={<Address />} />

          <Route path="/maps-app/map" element={<Map />} />

          <Route
            path="*"
            element={
              <Main>
                <p>There's nothing here!</p>
              </Main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

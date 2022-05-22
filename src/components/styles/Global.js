import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: 100%;
    }

    body {
        background-color: #e9eded;
        min-width: 100vw;
        margin: 0;
    }

    .leaflet-routing-container.leaflet-bar.leaflet-control {
        display: none;
    }
`;

export default GlobalStyles;

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
    }

    body {
        background-color: #f8f8f4;
    }

    .leaflet-routing-container.leaflet-bar.leaflet-control {
        display: none;
    }
`;

export default GlobalStyles;

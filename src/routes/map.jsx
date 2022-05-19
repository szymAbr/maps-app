import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import MapMain from "../components/MapMain";

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Map() {
  const { coordinates } = useContext(GlobalContext);

  console.log(coordinates);

  return (
    <FlexDiv>
      <h2>Map with selected route</h2>

      <MapMain />
    </FlexDiv>
  );
}

import { useContext } from "react";
import { FlexDiv } from "../components/styles/FlexDiv.styled";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import MapMain from "../components/MapMain";

export default function Map() {
  return (
    <FlexDiv>
      <h2>Map with selected route</h2>

      <MapMain />
    </FlexDiv>
  );
}

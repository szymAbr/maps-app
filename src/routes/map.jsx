import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalState";

const FlexDiv = styled.div`
  display: flex;
`;

export default function Map() {
  const { coordinates } = useContext(GlobalContext);

  console.log(coordinates);

  return (
    <FlexDiv>
      <h2>Map with selected route</h2>
    </FlexDiv>
  );
}

import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import TestMap from "../components/TestMap";

const FlexDiv = styled.div`
  display: flex;
`;

export default function Map() {
  const { coordinates } = useContext(GlobalContext);

  console.log(coordinates);

  // function route() {
  //   axios
  //     .get(
  //       `https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=${process.env.REACT_APP_API_KEY}`
  //     )
  //     .then((response) => {
  //       const data = response.data;

  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       const errorMsg = error.message;
  //       console.log(errorMsg);
  //     });
  // }

  return (
    <FlexDiv>
      <h2>Map with selected route</h2>

      <TestMap />
    </FlexDiv>
  );
}

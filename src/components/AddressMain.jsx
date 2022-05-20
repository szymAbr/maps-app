import { AddressSection } from "../components/styles/AddressSection.styled";
import AddressForm from "../components/AddressForm";
import { Button, ButtonContainer } from "./styles/Button.styled";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

export default function AddressMain() {
  const params = ["number", "street", "city", "postcode", "country"];
  const { coordsStart, coordsFinish, setCoordsStart, setCoordsFinish } =
    useContext(GlobalContext);
  const [start, setStart] = useState({
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [finish, setFinish] = useState({
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });
  const navigate = useNavigate();

  async function handleClick() {
    let addressStart = "";
    let addressFinish = "";

    for (const prop in start) {
      addressStart += `+${start[prop]}`;
    }

    for (const prop in finish) {
      addressFinish += `+${finish[prop]}`;
    }

    // replace potential spaces with "+"
    const addressStartClean = addressStart.replace(" ", "+");
    const addressFinishClean = addressFinish.replace(" ", "+");

    geocode("start", addressStartClean);
    geocode("finish", addressFinishClean);
  }

  function geocode(point, address) {
    axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const data = response.data;

        if (point === "start") {
          setCoordsStart({
            ...data.items[0].position,
          });
        } else {
          setCoordsFinish({
            ...data.items[0].position,
          });
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      })
      .finally(() => {
        navigate("/map");
      });
  }

  useEffect(() => {
    console.log("state coords start: ", coordsStart);
  }, [coordsStart]);

  useEffect(() => {
    console.log("state coords finish: ", coordsFinish);
  }, [coordsFinish]);

  return (
    <>
      <h2>Select route</h2>

      <AddressSection>
        <AddressForm
          heading="Start"
          params={params}
          start={start}
          setStart={setStart}
        />

        <AddressForm
          heading="Finish"
          params={params}
          finish={finish}
          setFinish={setFinish}
        />
      </AddressSection>

      <ButtonContainer>
        <Button onClick={handleClick}>Find route</Button>
      </ButtonContainer>
    </>
  );
}

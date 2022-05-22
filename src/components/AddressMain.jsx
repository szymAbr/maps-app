import { AddressSection } from "../components/styles/AddressSection.styled";
import AddressForm from "../components/AddressForm";
import { Button, ButtonContainer } from "./styles/Button.styled";
import { FlexDiv } from "../components/styles/FlexDiv.styled";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

export default function AddressMain() {
  const params = ["number", "street", "city", "postcode", "country"];
  const {
    startUpdated,
    endUpdated,
    setAddressStart,
    setAddressEnd,
    setCoordsStart,
    setCoordsEnd,
    setStartUpdated,
    setEndUpdated,
  } = useContext(GlobalContext);
  const [start, setStart] = useState({
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });
  const [end, setEnd] = useState({
    number: "",
    street: "",
    city: "",
    postcode: "",
    country: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (startUpdated && endUpdated) navigate("/maps-app/map");
  }, [startUpdated, endUpdated, navigate]);

  async function handleClick() {
    let addressStart = "";
    let addressEnd = "";

    for (const prop in start) {
      addressStart += `+${start[prop]}`;
    }

    for (const prop in end) {
      addressEnd += `+${end[prop]}`;
    }

    // replace potential spaces with "+"
    const addressStartClean = addressStart.replace(" ", "+");
    const addressEndClean = addressEnd.replace(" ", "+");

    geocode("start", addressStartClean);
    geocode("end", addressEndClean);
  }

  function geocode(point, address) {
    axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const data = response.data;
        const { street, houseNumber, postalCode, city, countryName } =
          data.items[0].address;
        let fullAddress = `${postalCode} ${city}, ${countryName}`;

        if (street && houseNumber) {
          fullAddress = `${street} ${houseNumber}, ` + fullAddress;
        } else if (street) {
          fullAddress = `${street}, ` + fullAddress;
        }

        if (point === "start") {
          setCoordsStart([
            data.items[0].position.lat,
            data.items[0].position.lng,
          ]);

          setAddressStart(fullAddress);

          setStartUpdated(true);
        } else {
          setCoordsEnd([
            data.items[0].position.lat,
            data.items[0].position.lng,
          ]);

          setAddressEnd(fullAddress);

          setEndUpdated(true);
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }

  return (
    <FlexDiv>
      <h2>Select route</h2>

      <AddressSection>
        <AddressForm
          heading="Start"
          params={params}
          start={start}
          setStart={setStart}
        />

        <AddressForm heading="End" params={params} end={end} setEnd={setEnd} />
      </AddressSection>

      <ButtonContainer>
        <Button onClick={handleClick}>Find route</Button>
      </ButtonContainer>
    </FlexDiv>
  );
}

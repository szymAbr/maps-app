import { AddressSection } from "../components/styles/AddressSection.styled";
import AddressForm from "../components/AddressForm";
import { Button, ButtonContainer } from "./styles/Button.styled";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

export default function AddressMain() {
  const params = ["number", "street", "city", "postcode", "country"];
  const { addressStart } = useContext(GlobalContext);
  const { setAddressStart } = useContext(GlobalContext);
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

  function handleClick() {
    let address = "";

    for (const prop in start) {
      address += `+${start[prop]}`;
    }

    // replace potential spaces with "+"
    const addressClean = address.replace(" ", "+");

    geocode(addressClean);
  }

  function geocode(address) {
    axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        const data = response.data;

        console.log(response);
        console.log(data);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }

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

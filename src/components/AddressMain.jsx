import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddressFormElement from "../components/AddressFormElement";
import { Form } from "./styles/AddressForm.styled";
import { FlexForm } from "./styles/FlexForm.styled";
import { Button } from "./styles/Button.styled";
import { FlexDiv } from "../components/styles/FlexDiv.styled";

export default function AddressMain() {
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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (startUpdated && endUpdated) navigate("/maps-app/map");
  }, [startUpdated, endUpdated, navigate]);

  function handleClick(e) {
    e.preventDefault();

    // replace spaces with "+"
    let addressStart = start.replace(/[ ]{1,}/g, "+");
    let addressEnd = end.replace(/[ ]{1,}/g, "+");

    geocode("start", addressStart);
    geocode("end", addressEnd);
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
        let fullAddress = `${postalCode} ${city}, ${countryName}`; // ternary operator?

        if (street && houseNumber) {
          fullAddress = `${street} ${houseNumber}, ${fullAddress}`;
        } else if (street) {
          fullAddress = `${street}, ${fullAddress}`;
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

      <Form>
        <FlexForm>
          <AddressFormElement
            heading="Start"
            start={start}
            setStart={setStart}
          />

          <AddressFormElement heading="End" end={end} setEnd={setEnd} />
        </FlexForm>

        <Button onClick={(e) => handleClick(e)}>Find route</Button>
      </Form>
    </FlexDiv>
  );
}

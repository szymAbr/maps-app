import { AddressSection } from "../components/styles/AddressSection.styled";
import AddressForm from "../components/AddressForm";
import { Button, ButtonContainer } from "./styles/Button.styled";

export default function AddressMain() {
  const params = ["House number", "Street", "City", "Postcode", "Country"];

  return (
    <>
      <h2>Select route</h2>

      <AddressSection>
        <AddressForm heading="Start" params={params} />

        <AddressForm heading="Finish" params={params} />
      </AddressSection>

      <ButtonContainer>
        <Button>Find route</Button>
      </ButtonContainer>
    </>
  );
}

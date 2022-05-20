import { Form } from "./styles/MapForm.styled";

export default function MapForm({ setPrice }) {
  function handleInput(e) {
    const price = e.target.value;

    if (price >= 0 && price <= 1000) {
      setPrice(price);
    } else if (price < 0) {
      alert("The proposed value is too low.");
    } else {
      alert("The proposed value is too high.");
    }
  }

  return (
    <>
      <Form>
        <input
          type="number"
          placeholder="Price per km [EUR]"
          onInput={handleInput}
        />
      </Form>
    </>
  );
}

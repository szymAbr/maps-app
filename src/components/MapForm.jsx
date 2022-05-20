import { Form } from "./styles/MapForm.styled";

export default function MapForm({ setPrice }) {
  return (
    <>
      <Form>
        <input
          type="number"
          placeholder="price per km [EUR]"
          onInput={(e) => setPrice(e.target.value)}
        />
      </Form>
    </>
  );
}

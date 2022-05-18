import { Form } from "./styles/AddressForm.styled";

export default function AddressForm({ heading, params }) {
  return (
    <Form>
      <h4>{heading}</h4>

      {params.map((param) => (
        <input type="text" placeholder={param} key={param} />
      ))}
    </Form>
  );
}

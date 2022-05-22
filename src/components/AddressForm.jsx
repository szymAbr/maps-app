import { Form } from "./styles/AddressForm.styled";

export default function AddressForm({
  heading,
  params,
  start,
  setStart,
  end,
  setEnd,
}) {
  return (
    <>
      <Form>
        <h4>{heading}</h4>

        {params.map((param) => (
          <input
            type="text"
            placeholder={param[0].toUpperCase() + param.slice(1)}
            key={param}
            onInput={(event) =>
              heading === "Start"
                ? setStart({ ...start, [param]: event.target.value.trim() })
                : setEnd({ ...end, [param]: event.target.value.trim() })
            }
          />
        ))}
      </Form>
    </>
  );
}

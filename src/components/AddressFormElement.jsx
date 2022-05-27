import { FormElement } from "./styles/AddressFormElement.styled";

export default function AddressFormElement({
  heading,
  start,
  setStart,
  end,
  setEnd,
}) {
  return (
    <FormElement>
      <label for={`textarea${heading}`}>{heading}</label>

      <textarea
        id={`textarea${heading}`}
        value={heading === "Start" ? start : end}
        onChange={(e) =>
          heading === "Start"
            ? setStart(e.target.value)
            : setEnd(e.target.value)
        }
        maxLength={150}
      ></textarea>
    </FormElement>
  );
}

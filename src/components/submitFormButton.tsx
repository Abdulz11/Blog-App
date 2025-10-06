import { useFormStatus } from "react-dom";

export default function SubmitFormButton() {
  const { pending } = useFormStatus();

  return (
    <button style={{ cursor: "pointer" }}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

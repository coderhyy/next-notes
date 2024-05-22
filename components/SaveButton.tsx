import { useFormStatus } from "react-dom";

interface SaveButtonProps {
  formAction: (formData: FormData) => void;
}

export default function SaveButton({ formAction }: SaveButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? "Saving" : "Done"}
    </button>
  );
}

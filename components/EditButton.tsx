import Link from "next/link";
import { ReactNode } from "react";

interface EditButtonProps {
  noteId: string | null;
  children: ReactNode;
}

export default function EditButton({ noteId, children }: EditButtonProps) {
  const isDraft = noteId === null;
  return (
    <Link className="link--unstyled" href={`/note/edit/${noteId ?? ""}`}>
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}

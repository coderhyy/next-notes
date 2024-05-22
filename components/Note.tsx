import { format } from "date-fns";
import { useTranslations } from "next-intl";
import EditButton from "./EditButton";
import NotePreview from "./NotePreview";

interface NoteProps {
  noteId: string;
  note: Record<string, string>;
}

export default function Note({ noteId, note }: NoteProps) {
  const t = useTranslations("Basic");
  const { title, content, updateTime } = note;

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {format(updateTime, "yyy-MM-dd hh:mm:ss")}
          </small>
          <EditButton noteId={noteId}>{t("edit")}</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}

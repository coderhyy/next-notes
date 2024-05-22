import { format } from "date-fns";
import SidebarNoteItemContent from "./SidebarNoteItemContent";

interface SidebarNoteItemProps {
  noteId: string;
  note: Record<string, string>;
}

export default function SidebarNoteItem({
  noteId,
  note,
}: SidebarNoteItemProps) {
  const { title, content = "", updateTime } = note;

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{format(updateTime, "yyyy-MM-dd hh:mm:ss")}</small>
      </header>
    </SidebarNoteItemContent>
  );
}

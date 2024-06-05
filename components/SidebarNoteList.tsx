import { getAllNotes } from "@/lib/prisma";
import SidebarNoteListFilter from "./SidebarNoteListFilter";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

interface SidebarNoteListProps {}

export default async function SidebarNoteList({}: SidebarNoteListProps) {
  const notes = await getAllNotes();

  if (!Object.entries(notes).length) {
    return <div className="notes-empty">No notes created yet!</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note as string);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}

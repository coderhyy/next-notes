"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from "./SidebarNoteItemContent";

interface SidebarNoteListFilterProps {
  notes: Record<string, any>[];
}

export default function SidebarNoteListFilter({
  notes,
}: SidebarNoteListFilterProps) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || <i>(No content)</i>}
                </p>
              }
            >
              {header}
            </SidebarNoteItemContent>
          );
        }
      })}
    </ul>
  );
}

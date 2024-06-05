import Note from "@/components/Note";
import { getNote } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const noteId = params.id;
  const note = await getNote(noteId);

  if (!note) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note noteId={noteId} note={note} />;
}

import NoteEditor from "@/components/NoteEditor";
import { getNote } from "@/lib/redis";

interface EditPageProps {
  params: { id: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const noteId = params.id;
  const note = await getNote(noteId);

  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  // await sleep(2000);

  if (!note) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    ></NoteEditor>
  );
}

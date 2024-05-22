import Note from "@/components/Note";
import { getNote } from "@/lib/redis";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
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

  return <Note noteId={noteId} note={note} />;
}

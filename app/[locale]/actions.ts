"use server";

import { addNotes, delNote, updateNotes } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z
    .string()
    .min(1, { message: "请填写内容" })
    .max(100, { message: "字数最多 100" }),
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function saveNote(
  prevState: Record<string, any> | null,
  formData: FormData
) {
  // 获取 noteId
  const noteId = formData.get("noteId");
  const data = {
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  await sleep(2000);

  if (noteId) {
    if (typeof noteId === "string") updateNotes(noteId, JSON.stringify(data));
    revalidatePath("/", "layout");
    // redirect(`/note/${noteId}`);
  } else {
    const noteId = await addNotes(JSON.stringify(data));
    revalidatePath("/", "layout");
    // redirect(`/note/${noteId}`);
  }

  return { message: "Add Success!" };
}

export async function deleteNote(prevState: null, formData: FormData) {
  const noteId = formData.get("noteId");
  if (typeof noteId === "string") delNote(noteId);
  revalidatePath("/", "layout");
  return redirect("/");
}

"use server";

import { addNote, delNote, updateNote } from "@/lib/prisma";
import { format } from "date-fns";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z
    .string()
    .min(1, { message: "请填写内容" })
    .max(100, { message: "字数最多 100" }),
});

export async function saveNote(
  prevState: Record<string, any> | null,
  formData: FormData
) {
  // 获取 noteId
  const noteId = formData.get("noteId");
  const data = {
    title: formData.get("title") as string,
    content: formData.get("body") as string,
    // updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  if (noteId) {
    if (typeof noteId === "string") updateNote(noteId, data);
    revalidatePath("/", "layout");
    // redirect(`/note/${noteId}`);
  } else {
    const noteId = await addNote(data);
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

export async function importNote(formData: FormData) {
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return { error: "File is required." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${format(Date.now(), "yy-MM-dd")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(error);
      return { error: "Something went wrong." };
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await addNote({
      title: filename,
      content: buffer.toString("utf-8"),
    });

    // 清除缓存
    revalidatePath("/", "layout");

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
}

import { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { format } from "date-fns";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addNote } from "@/lib/prisma";

export async function POST(request: Request) {
  // 获取 formData
  const formData = await request.formData();
  const file = formData.get("file");

  // 空值判断
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  // 获取文件保存的位置
  const relativeUploadDir = `/uploads/${format(Date.now(), "yy-MM-dd")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    // 写入文件
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 写入数据库
    const res = await addNote({
      title: filename,
      content: buffer.toString("utf-8"),
    });

    // 重新验证
    revalidatePath("/", "layout");

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

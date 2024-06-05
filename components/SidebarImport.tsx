"use client";

import { ChangeEventHandler, useTransition } from "react";
import { useRouter } from "next/navigation";
import { importNote } from "@/app/[locale]/actions";

export default function SidebarImport() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const fileInput = e.target;
    console.log(fileInput.files);

    if (!fileInput.files || !fileInput.files.length) {
      return console.warn("files list is empty");
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    // 方式一：Route Handlers
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     return console.error("something went wrong");
    //   }

    //   const data = await response.json();

    //   startTransition(() => router.push(`/note/${data.uid}`));
    //   startTransition(() => router.refresh());
    // } catch (error) {
    //   console.error("something went wrong");
    // }

    // 方式二：Server Actions
    try {
      const data = await importNote(formData);
      data.uid && router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error("something went wrong");
    }
  };

  return (
    <form method="post" encType="multipart/form-data">
      <div style={{ textAlign: "center" }}>
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          Import .md File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".md"
          style={{ position: "absolute", clipPath: "rect(0 0 0 0)" }}
          onChange={onChange}
        />
      </div>
    </form>
  );
}

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
import SidebarNoteList from "./SidebarNoteList";
import SidebarSearchField from "./SidebarSearchField";
import SidebarImport from "./SidebarImport";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar() {
  const t = useTranslations("Basic");

  return (
    <section className="col sidebar">
      <Link href={"/"} className="link--unstyled">
        <section className="sidebar-header">
          <Image
            className="logo"
            src="/logo.svg"
            width="22"
            height="20"
            alt=""
            role="presentation"
          />
          <strong>Next Notes</strong>
        </section>
      </Link>
      <section className="sidebar-menu" role="menubar">
        <SidebarSearchField />
        <EditButton noteId={null}>{t("new")}</EditButton>
      </section>
      <nav>
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </nav>
      <SidebarImport />
      <SidebarFooter />
    </section>
  );
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./style.css";
import Sidebar from "@/components/Sidebar";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="container">
            <div className="main">
              <Sidebar />
              <section className="col note-viewer">{children}</section>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

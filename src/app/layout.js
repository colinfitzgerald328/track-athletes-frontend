import { GeistSans, GeistMono } from "geist/font";
import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "Athletics Hub",
  description: "Athletics Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}

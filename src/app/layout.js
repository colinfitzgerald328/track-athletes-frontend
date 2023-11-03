import { GeistSans, GeistMono } from "geist/font";
import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "Athletics Hub",
  description: "Athletics Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <Head>
        <link rel="icon" href="/page_logo.svg" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
